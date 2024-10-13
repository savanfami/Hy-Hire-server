import { IDependencies } from 'application/interfaces/IDependencies'
import { Router } from 'express'
import { controller } from '../../presentation/controller'
import express from 'express'
import { jwtMiddleware } from '../../utils/middleware/jwtVerifcainMiddleware'
import { Roles } from '../../utils/types/types'

export const router = (dependencies: IDependencies) => {
    const { getAllUser, updateProfile, getUserData, creatSubscriptionSession, subscriptionWebhook } = controller(dependencies)

    const router = Router()
    router.route('/get-data').get(jwtMiddleware(Roles.User), getUserData)
    router.route('/get-alluser').get(jwtMiddleware(Roles.Admin), getAllUser)
    router.route('/profile').post(jwtMiddleware(Roles.User), updateProfile)
    router.route('/create-checkout-session').post(jwtMiddleware(Roles.User), creatSubscriptionSession)
    router.post("/webhook", express.raw({ type: "application/json" }), subscriptionWebhook())
    return router

}

          