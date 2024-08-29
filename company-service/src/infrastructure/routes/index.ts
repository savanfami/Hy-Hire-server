import { Router } from 'express'
import { controller } from '../../presentation/controller'
import { IDependencies } from 'application/interfaces/IDependencies'
import { jwtMiddleware } from '../../utils/middleware/jwtMiddleware'



export const router = (dependencies: IDependencies) => {

    const { updateProfile,getCompany,updateSocialLinks,sendRequest } = controller(dependencies)
    const router = Router()
    router.route('/').get(jwtMiddleware,getCompany)
    router.route('/overview').post(jwtMiddleware,updateProfile)
    router.route('/social-links').post(jwtMiddleware,updateSocialLinks)
    router.route('/company-request').post(jwtMiddleware,sendRequest)
    return router
}