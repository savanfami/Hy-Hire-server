import { Router } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'
import { controller } from '../../presentation/controller'
import { jwtMiddleware } from '../../utils/middleware/jwtVerifcainMiddleware'


export const router=(dependencies:IDependencies)=>{
    const {jobPost,listJobs,getAllJobs,addUser}=controller(dependencies)
    const router=Router()

    router.route('/post-job').post(jwtMiddleware,jobPost)
    router.route('/list-jobs').get(jwtMiddleware,listJobs)
    router.route('/get-alljobs').get(getAllJobs)
    router.route('/add-user').post(addUser)
    return router
}   