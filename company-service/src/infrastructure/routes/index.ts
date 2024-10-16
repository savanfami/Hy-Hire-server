import { Router } from 'express'
import { controller } from '../../presentation/controller'
import { IDependencies } from 'application/interfaces/IDependencies'
import { jwtMiddleware } from '../../utils/middleware/jwtMiddleware'
import { Roles } from '../../utils/types/allTypes'



export const router = (dependencies: IDependencies) => {

    const { updateProfile, getCompany, getAllCompany, updateSocialLinks, sendRequest, listRequest, updateRequest,getCompanyData } = controller(dependencies)
    const router = Router()
    router.route('/').get(jwtMiddleware(Roles.Company), getCompany)
    router.route('/overview').post(jwtMiddleware(Roles.Company), updateProfile)
    router.route('/social-links').post(jwtMiddleware(Roles.Company), updateSocialLinks)
    router.route('/company-request').post(jwtMiddleware(Roles.Company), sendRequest)
    router.route('/list-Request').get(jwtMiddleware(Roles.Admin), listRequest)
    router.route('/update-request').patch(jwtMiddleware(Roles.Admin), updateRequest)
    router.route('/get-allcompany').get(getAllCompany)
    router.route('/getcompanydata').get(getCompanyData)
    return router
}   