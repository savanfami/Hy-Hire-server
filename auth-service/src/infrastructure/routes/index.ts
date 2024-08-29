import { IDependencies } from 'application/interfaces/IDependencies'
import { Router } from 'express'
import { controller } from '../../presentation/controller'
import { jwtMiddleware } from '../../utils/middleware/jwtMiddleware'
import { jwtForgetPasswordMiddleware } from '../../utils/middleware/jwtForgetPasswordVerification'

 export const router=(dependencies:IDependencies)=>{
    const {signup,verifyOtp,userLogin,getUserData,logOut,forgotPassword,resetPassword,googleSignup,blockUnblock,resendOtp}=controller(dependencies)

    const router=Router()
    router.route('/').get(jwtMiddleware,getUserData)
    router.route('/signup').post(signup)
    router.route('/verify-otp').post(verifyOtp)
    router.route('/login').post(userLogin)
    router.route('/logout').get(logOut)
    router.route('/forgotPassword').post(forgotPassword)
    router.route('/resetPassword').put(jwtForgetPasswordMiddleware,resetPassword)
    router.route('/googleauth').post(googleSignup)
    router.route('/block-unblock/:userId').put(blockUnblock)
    router.route('/resendOtp').post(resendOtp)
    return router

}

