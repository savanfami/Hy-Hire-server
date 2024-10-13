import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
// import { User } from "../../infrastructure/database/mongodb/models/userSchema";

const stripe = new Stripe('whsec_ebbb5b4f1913d986aa89a18304f78f0b3e76aa770796da7190fd4b53a61d25db'as string, {
  apiVersion: "2024-09-30.acacia",
});

// const STRIPE_ENDPOINT_SECRET = 'whsec_ebbb5b4f1913d986aa89a18304f78f0b3e76aa770796da7190fd4b53a61d25db';

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
      );


    } catch (err) {
        console.log(err)
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    // Switch-case to handle different event types
    switch (event.type) {
      //  Event: checkout.session.completed
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        console.log(checkoutSession,'this is chekcoout session ----------------$$$$$$$$$$$------------------------');
        
        // const subscriptionId=checkoutSession.subscription as string;

    //    const  subscriptionDetails = await stripe.subscriptions.retrieve(subscriptionId);
        //   console.log(subscriptionDetails,'subscripyion frtaildf')
        // const userEmail = checkoutSession.metadata?.userEmail as string;
        // const userId = checkoutSession.metadata?.userId as string;

        // const subscriptionData = {
        //   paymentStatus: checkoutSession.payment_status,
        //   planType: "pro",
        //   isProUser: true,
        //   isActive: true,
        //   planStarted :new Date(checkoutSession.created * 1000),
        //   planExpiration: new Date(subscriptionDetails.current_period_end * 1000),
        // };

        
        // const transactionData = {
        //   transactionType: "credit", 
        //   message: "Pro subscription payment", 
        //   date: new Date(),
        //   amount: parseFloat(checkoutSession.metadata?.amount as string),
        //   transactionID: checkoutSession.payment_intent?.toString() || "",
        // };

        // try {
        //    const user = await User.findOne({ email: userEmail });
        //   if (!user) {
        //     return res.status(404).json({ error: "User not found" });
        //   }
        //   if (!user.subscription) {
        //     user.subscription = [];
        //   }
        //   if (!user.transactions) {
        //     user.transactions = [];
        //   }

        //   user.subscription.push(subscriptionData);
        //   user.transactions.push(transactionData);
        //   await user.save();

        //   return res.status(200).json({ received: true });
        // } catch (error) {
        //   console.error("Error updating subscription:", error);
        //   return res.status(500).send("Internal Server Error");
        // }
      }

      // Event: invoice.payment_succeeded
    
      case "invoice.payment_succeeded": {
        console.log("Invoice payment succeeded");
        break;
      }

    //  Event: invoice.payment_failed
      case "invoice.payment_failed": {
        console.log("Invoice payment failed");
        break;
      }
      default: {
        console.log(`Unhandled event type ${event.type}`);
        break;
      }
    }
  };
};