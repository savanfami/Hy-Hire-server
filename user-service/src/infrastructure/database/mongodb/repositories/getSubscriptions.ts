import { IGetSubscriptionResponse } from "utils/types/types";
import { Subscription } from "../model/subscriptionModel";

export const getSubscriptions = async (): Promise<IGetSubscriptionResponse | null> => {
    try {
        const data = await Subscription.aggregate([
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'userId',
                    as: 'subscriptionDetails'
                }
            },
            { $unwind: '$subscriptionDetails' },
            {
                $project: {
                    _id: 0,
                    status: 1,
                    currentPeriodEnd: 1,
                    amount: 1,
                    cancellationFeedback: 1,
                    plan: 1,
                    cancelAtPeriodEnd: 1,
                    name: '$subscriptionDetails.name',
                    email: '$subscriptionDetails.email',
                    createdAt: 1
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $group: {
                    _id: null,
                    subscriptions: { $push: '$$ROOT' },
                    totalAmount: { $sum: '$amount' }
                }
            },

        ]);

        if (data.length > 0) {
            return {
                data: data[0].subscriptions,
                totalAmount: data[0].totalAmount
            };
        } else {
            return null;
        }

    } catch (error: any) {
        throw new Error(`Failed to get data: ${error.message}`);
    }
};
