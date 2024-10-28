import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { config } from 'dotenv';
import { Subscription } from "../../infrastructure/database/mongodb/model/subscriptionModel";
config();
// const secret=process.env.STRIPE.SECRET_KEY as string
// console.log(secret)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});
console.log('connected')
export const createSubscriptionSessionController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { plan } = req.body;
    const userId = req.user?._id;
    const email = req.user?.email;
   
    const existingSubscription = await Subscription.findOne({ userId, status: 'active' });
    if (existingSubscription) {
      return res.status(400).json({message:'already has an active subscription'});
    }
    let priceId: string | undefined;

    switch (plan) {
      case 'bronze':
        priceId = 'price_1Q5kW2FYWf8ALHrOqdONfulE';
        break;
      case 'gold':
        priceId = 'price_1Q5kj5FYWf8ALHrOXcpHHon4';
        break;
      case 'platinum':
        priceId = 'price_1Q5kkkFYWf8ALHrOFqk06FBj';
        break;
      case 'diamond':
        priceId = 'price_1Q5klmFYWf8ALHrOlhtpPfpu';
        break;
      default:
        return res.status(400).json({ error: 'Invalid plan selected' });
    }

    try {
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "subscription",
        success_url: `${process.env.FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL}/trypremium`,
        metadata: {
          userId: userId,
          userEmail: email,
          plan: plan
        },
      } as Stripe.Checkout.SessionCreateParams);
      console.log('creaed successfully')
      res.status(200).json({ success: true, id: session.id, message: "Subscription created successfully" });
    } catch (error) {
      console.error("Error creating subscription session:", error);
      next(error);
    }
  };
};

export const createCustomerPortalSessionController =
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const subscription = await Subscription.findOne({ userId, status: 'active' })
    if (!subscription) {
      return res.status(400).json({ error: 'User does not have an active subscription' });
    }
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId as string,
        return_url: `${process.env.FRONTEND_URL}`,
      });
      res.json({ url: session.url });
    } catch (error) {
      next(error)
    }
  };