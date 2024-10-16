import { IDependencies } from 'application/interfaces/IDependencies'
import { Router } from 'express'
import { controller } from '../../presentation/controller'
import express from 'express'
import { jwtMiddleware } from '../../utils/middleware/jwtVerifcainMiddleware'
import { Roles } from '../../utils/types/types'
import { createCustomerPortalSessionController } from '../../presentation/controller/createSubscriptionSession'

export const router = (dependencies: IDependencies) => {
    const { getAllUser, updateProfile, getUserData, creatSubscriptionSession, subscriptionWebhook,checkSubscription,getSubscriptions } = controller(dependencies)

    const router = Router()
    router.route('/get-data').get(jwtMiddleware(Roles.User), getUserData)
    router.route('/get-alluser').get(jwtMiddleware(Roles.Admin), getAllUser)
    router.route('/profile').post(jwtMiddleware(Roles.User), updateProfile)
    router.route('/create-checkout-session').post(jwtMiddleware(Roles.User), creatSubscriptionSession)
    router.post("/webhook", express.raw({ type: "application/json" }), subscriptionWebhook())
    router.route('/subscription-status').get(jwtMiddleware(Roles.User),checkSubscription)
    router.route('/create-portal-session').post(jwtMiddleware(Roles.User),createCustomerPortalSessionController)

    router.route('/subscriptions').get(jwtMiddleware(Roles.Admin),getSubscriptions)
    return router
}

          