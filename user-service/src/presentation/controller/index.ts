import { IDependencies } from "application/interfaces/IDependencies";
import { getUserController } from "./getUser";
import { updateProfileController } from "./updateProfile";
import { getUserDataController } from "./getUserData";
import {   createSubscriptionSessionController } from "./createSubscriptionSession";
import { subscriptionWebhookController } from "./subscriptionWebHook";
import { checkSubscriptionStatusController } from "./checkSubscriptionStatusController";
import { getSubscriptionController } from "./getSubsctiptionsController";

export const controller=(dependencies:IDependencies)=>{
    return {
        getAllUser:getUserController(dependencies),
        updateProfile:updateProfileController(dependencies),
        getUserData:getUserDataController(dependencies),
        creatSubscriptionSession:createSubscriptionSessionController(),
        subscriptionWebhook:subscriptionWebhookController,
        checkSubscription:checkSubscriptionStatusController(dependencies),
        getSubscriptions:getSubscriptionController(dependencies),
    }
}