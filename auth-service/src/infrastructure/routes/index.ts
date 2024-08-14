import { IDependencies } from 'application/interfaces/IDependencies'
import { Router } from 'express'
import { controller } from '../../presentation/controller'
import { jwtMiddleware } from '../../utils/middleware/jwtMiddleware'

 export const router=(dependencies:IDependencies)=>{
    const {signup,verifyOtp,userLogin,getUserData}=controller(dependencies)

    const router=Router()
    router.route('/').get(jwtMiddleware,getUserData)
    router.route('/signup').post(signup)
    router.route('/verify-otp').post(verifyOtp)
    router.route('/login').post(userLogin)

    return router

}

