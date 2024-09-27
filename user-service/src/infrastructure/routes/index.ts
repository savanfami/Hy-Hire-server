import { IDependencies } from 'application/interfaces/IDependencies'
import { Router } from 'express'
import { controller } from '../../presentation/controller'
import { jwtMiddleware } from '../../utils/middleware/jwtVerifcainMiddleware'

export const router = (dependencies: IDependencies) => {
    const { getAllUser, updateProfile, getUserData } = controller(dependencies)

    const router = Router()
    router.route('/get-data').get(jwtMiddleware('user'), getUserData)
    router.route('/get-alluser').get(jwtMiddleware(), getAllUser)
    router.route('/profile').post(jwtMiddleware('user'), updateProfile)
    // router.route('/').get(jwtMiddleware,getUserData)
    // router.route('/signup').post(signup)
    // router.route('/verify-otp').post(verifyOtp)
    // router.route('/login').post(userLogin)

    return router

}

