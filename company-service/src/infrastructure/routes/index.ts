import { Router } from 'express'
import { controller } from '../../presentation/controller'
import { IDependencies } from 'application/interfaces/IDependencies'
import { jwtMiddleware } from '../../utils/middleware/jwtMiddleware'



export const router = (dependencies: IDependencies) => {

    const { updateProfile, getCompany,getAllCompany, updateSocialLinks, sendRequest, listRequest, updateRequest } = controller(dependencies)
    const router = Router()
    router.route('/').get(jwtMiddleware('company'), getCompany)
    router.route('/overview').post(jwtMiddleware('company'), updateProfile)
    router.route('/social-links').post(jwtMiddleware('company'), updateSocialLinks)
    router.route('/company-request').post(jwtMiddleware('company'), sendRequest)
    router.route('/get-allcompany').get(getAllCompany)
    router.route('/list-Request').get(jwtMiddleware('admin'),listRequest)
    router.route('/update-request').patch(jwtMiddleware('admin'),updateRequest)
    return router
}   