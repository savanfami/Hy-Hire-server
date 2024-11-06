import { Router } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'
import { controller } from '../../presentation/controller'
import { jwtMiddleware } from '../../utils/middleware/jwtVerifcainMiddleware'
import { Roles } from '../../utils/types/types'


export const router = (dependencies: IDependencies) => {
    const { jobPost, listJobs, getAllJobs, addUser, applyJob,getAllUser,deleteJob,getAllData,saveJobs,savedJobs,getUserDetailsByJob,updateHiringStatus,getApplication,
        createChat,getCount,getApplicationDetails,getChat,createMessage,getMessages,getAdminDashboard,getCompanyDashboard,getUserDashboard,interviewSchedule,
        getScheduledInterview,rescheduleInterview
    } = controller(dependencies)
    const router = Router()
    router.route('/post-job').post(jwtMiddleware(Roles.Company), jobPost)
    router.route('/list-jobs').get(jwtMiddleware(Roles.Company),listJobs).delete(jwtMiddleware(Roles.Company),deleteJob)
    router.route('/get-alljobs').get(getAllJobs)
    router.route('/add-user').post(addUser)
    router.route('/apply-job').post(jwtMiddleware(Roles.User), applyJob)
    router.route('/get-alluser').get(jwtMiddleware(Roles.Company),getAllUser)
    router.route('/getallData').get(getAllData)
    router.route('/savejob').post(jwtMiddleware(Roles.User),saveJobs)
    router.route('/savedjobs').get(jwtMiddleware(Roles.User),savedJobs)
    router.route('/:jobId/listusers').get(jwtMiddleware(Roles.Company),getUserDetailsByJob)
    router.route('/update-status').put(jwtMiddleware(Roles.Company),updateHiringStatus)
    router.route('/all-applications').get(jwtMiddleware(Roles.User),getApplication)
    router.route('/count').get(getCount)
    router.route('/applications/:id').get(jwtMiddleware(Roles.User),getApplicationDetails)
    router.route('/admin-dashboard').get(jwtMiddleware(Roles.Admin),getAdminDashboard)
    router.route('/company-dashboard').get(jwtMiddleware(Roles.Company),getCompanyDashboard)
    router.route('/user-dashboard').get(jwtMiddleware(Roles.User),getUserDashboard)
    router.route('/schedules/:id').get(jwtMiddleware(Roles.Company),interviewSchedule)
    router.route('/schedules').get(jwtMiddleware(Roles.User),getScheduledInterview)
    router.route('/reschedule').post(jwtMiddleware(Roles.User),rescheduleInterview)
    //chat routes

    router.route('/chat/create').post(jwtMiddleware(),createChat)
    router.route('/chat').get(jwtMiddleware(),getChat)
    router.route('/messages').post(jwtMiddleware(),createMessage).get(jwtMiddleware(),getMessages)//middleware need to be added for user and company
    return router
}   