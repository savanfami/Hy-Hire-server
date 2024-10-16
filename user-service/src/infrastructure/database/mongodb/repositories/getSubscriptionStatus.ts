import { ICheckSuscriptionResponse } from "utils/types/types";
import { Subscription } from "../model/subscriptionModel";

export const getSubscriptionStatus = async (userId: string): Promise<ICheckSuscriptionResponse | null> => {
    try {

        const subscription = await Subscription.findOne({ userId, isExpired: false })
        return {
            isSubscribed: !!subscription,
            subscriptionDetails: subscription as unknown as any
        }
    } catch (error: any) {
        throw new Error(`Failed to update profile: ${error.message}`);

    }
}