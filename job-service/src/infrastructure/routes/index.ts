import { Router } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'
import { controller } from '../../presentation/controller'
import { jwtMiddleware } from '../../utils/middleware/jwtVerifcainMiddleware'
import { Roles } from '../../utils/types/types'


export const router = (dependencies: IDependencies) => {
    const { jobPost, listJobs, getAllJobs, addUser, applyJob,getAllUser} = controller(dependencies)
    const router = Router()
    router.route('/post-job').post(jwtMiddleware(Roles.Company), jobPost)
    router.route('/list-jobs').get(listJobs)
    router.route('/get-alljobs').get(getAllJobs)
    router.route('/add-user').post(addUser)
    router.route('/apply-job').post(jwtMiddleware(Roles.User), applyJob)
    router.route('/get-alluser').get(getAllUser)
    return router
}   