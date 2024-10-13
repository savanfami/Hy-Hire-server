import { IDependencies } from "application/interfaces/IDependencies";
import { getUserController } from "./getUser";
import { updateProfileController } from "./updateProfile";
import { getUserDataController } from "./getUserData";
import { createSubscriptionSessionController } from "./createSubscriptionSession";
import { subscriptionWebhookController } from "./subscriptionWebHook";

export const controller=(dependencies:IDependencies)=>{
    return {
        getAllUser:getUserController(dependencies),
        updateProfile:updateProfileController(dependencies),
        getUserData:getUserDataController(dependencies),
        creatSubscriptionSession:createSubscriptionSessionController(),
        subscriptionWebhook:subscriptionWebhookController
    }
}