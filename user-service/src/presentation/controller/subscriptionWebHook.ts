import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Stripe from "stripe";
import { Subscription } from "../../infrastructure/database/mongodb/model/subscriptionModel";

const stripe = new Stripe('sk_test_51Q5fxNFYWf8ALHrOqy7YyHHv1oM6fRf8BaQMWnVXGeObjjaENgzKHXZ5N8TTa32hzzvRL93ZIWYkFLuVKFqcnWpt00tx5io3Ij' as string, {
  apiVersion: "2024-09-30.acacia",
});

export const subscriptionWebhookController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const stripeSignature = req.headers["stripe-signature"];
    if (!stripeSignature) {
      throw new Error("No stripe signature found!");
    }
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        stripeSignature.toString(),
        'whsec_ebbb5b4f1913d986aa89a18304f78f0b3e76aa770796da7190fd4b53a61d25db'
      )
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        console.log('Called session completed');
        console.log(event.data);
        await handleCheckoutSessionCompleted(event);
        break;
      }

      case "invoice.paid": {
        console.log("Invoice payment succeeded");
        console.log(event.data);
        await handleInvoicePaid(event);
        break;
      }

      case "invoice.payment_failed": {
        console.log("Invoice payment failed");
        console.log(event.data);
        await handleInvoicePaymentFailed(event);
        break;
      }

      case 'customer.subscription.updated': {
        console.log('Customer subscription updated');
        console.log(event.data);
        await handleSubscriptionUpdated(event);
        break;
      }

      case 'customer.subscription.deleted': {
        console.log('Customer subscription deleted');
        console.log(event.data);
        await handleSubscriptionDeleted(event);
        break;
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`);
        break;
      }
    }

    res.status(200).json({ received: true });
  }
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const checkoutSession = event.data.object as Stripe.Checkout.Session;
  const subscriptionId = checkoutSession.subscription as string;
  try {
    const subscriptionDetails = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = new mongoose.Types.ObjectId(checkoutSession.metadata?.userId ?? '');
    const plan = checkoutSession.metadata?.plan ?? '';
    const amountInCents = subscriptionDetails.items.data[0].price.unit_amount ?? 0;
    const amount = amountInCents / 100;
    const status = subscriptionDetails.status;
    const currentPeriodStart = new Date(subscriptionDetails.current_period_start * 1000);
    const currentPeriodEnd = new Date(subscriptionDetails.current_period_end * 1000);
    const cancelAtPeriodEnd = subscriptionDetails.cancel_at_period_end ?? false;
    const stripeCustomerId = subscriptionDetails.customer as string;

    const newSubscription = new Subscription({
      userId,
      stripeSubscriptionId: subscriptionId,
      plan,
      status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd,
      amount,
      stripeCustomerId
    });
    await newSubscription.save();
  } catch (error) {
    console.error("Error saving subscription data:", error);
  }
}

async function handleInvoicePaid(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId = invoice.subscription as string;
  try {
    const subscription = await Subscription.findOne({ stripeSubscriptionId: subscriptionId });
    if (subscription) {
      subscription.status = 'active';
      subscription.currentPeriodEnd = new Date(invoice.lines.data[0].period.end * 1000);
      await subscription.save();
    }
  } catch (error) {
    console.error("Error updating subscription after invoice paid:", error);
  }
}

async function handleInvoicePaymentFailed(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId = invoice.subscription as string;
  try {
    const subscription = await Subscription.findOne({ stripeSubscriptionId: subscriptionId });
    if (subscription) {
      subscription.status = 'past_due';
      await subscription.save();
    }
  } catch (error) {
    console.error("Error updating subscription after invoice payment failed:", error);
  }
}

async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscriptionDetails = event.data.object as Stripe.Subscription;
  try {
    const subscription = await Subscription.findOne({ stripeSubscriptionId: subscriptionDetails.id });
    if (subscription) {
      subscription.status = subscriptionDetails.status;
      subscription.currentPeriodEnd = new Date(subscriptionDetails.current_period_end * 1000);
      subscription.cancelAtPeriodEnd = subscriptionDetails.cancel_at_period_end;
      if (subscriptionDetails.cancellation_details && subscriptionDetails.cancellation_details.feedback) {
        subscription.cancellationFeedback = subscriptionDetails.cancellation_details.feedback;
      }
      await subscription.save();
    }
  } catch (error) {
    console.error("Error updating subscription details:", error);
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscriptionDetails = event.data.object as Stripe.Subscription;
  try {
    await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionDetails.id },
      { status: 'canceled', isExpired: true }
    );
  } catch (error) {
    console.error("Error marking subscription as canceled:", error);
  }
}