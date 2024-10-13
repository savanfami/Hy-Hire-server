// import { IDependencies } from "../../application/interface/IDependencies";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { config } from 'dotenv'
config()

// import { STRIPE_SECRET } from "../../config/envConfig/config";
// import { getUserById } from '../../infrastructure/database/mongodb/repositories';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , {
  apiVersion: "2024-09-30.acacia",
});

export const createSubscriptionSessionController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
     const {plan}=req.body
     let priceId:any
     switch(plan){
        case 'bronze':
        priceId='price_1Q5kW2FYWf8ALHrOqdONfulE';
        break;

        case 'gold': 
        priceId='price_1Q5kj5FYWf8ALHrOXcpHHon4'
        break;

        case 'platinum':
        priceId='price_1Q5kkkFYWf8ALHrOFqk06FBj'
        break;

        case 'diamond':
        priceId='price_1Q5klmFYWf8ALHrOlhtpPfpu'
        break;
        default :
        return res.status(400).json({error:'invalid plan selecteed'})
     }
    try {
    //   const user = await getUserById(userId);
    //  console.log(user);

    //   if (!user) {
    //     return res.status(404).json({ error: "User not found" });
    //   }

    //   const hasProSubscription = user.subscription?.some(
    //     (sub: any) => sub.planType === "pro" && sub.isActive === true
    //   );

    //   if (hasProSubscription) {
    //     return res.status(200).json({ error: "You have already purchased the Pro version." });
    //   }

    //   const amount=1000
      const lineItems = [
        {
          price: priceId, 
          quantity: 1,
        },
      ];

      
      
  console.log(process.env.FRONTEND_URL)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "subscription",
        success_url: `${process.env.FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
        // metadata: {
        // //   userId: userId.toString(),
        // //   userEmail: email,
        //   amount: 499,
        // },
      });
      

      res.status(200).json({ success: true, id: session.id, message: "Subscription response" });
    } catch (error) {
        console.log(error,'eeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      next(error);
    }
  };
};