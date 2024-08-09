import { IDependencies } from 'application/interfaces/IDependencies'
import { Router } from 'express'
import { controller } from '../../presentation/controller'

 export const router=(dependencies:IDependencies)=>{
    const {signup,verifyOtp,userLogin}=controller(dependencies)

    const router=Router()

    router.route('/signup').post(signup)
    router.route('/verify-otp').post(verifyOtp)
    router.route('/login').post(userLogin)

    return router

}

