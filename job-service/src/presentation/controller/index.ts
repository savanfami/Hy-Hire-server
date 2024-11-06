import { IDependencies } from "application/interfaces/IDependencies";
import { postJobController } from "./postJobController";
import { listJobsController } from "./listJobs";
import { getAllJobsController } from "./getAllJobs";
import { addUserController } from "./addUser";
import { applyJobController } from "./applyJob";
import { getAllUserController } from "./getAllUser";
import { deleteJobsController } from "./deleteJob";
import { getAllDataController } from "./getAllDataController";
import { saveJobController } from "./saveJobController";
import { getSavedJobsController } from "./getSavedJobs";
import { getUserDetailsByJobController } from "./getUserDetailsByJob";
import { updateStatusController } from "./updateStatusController";
import { getApplicationByUserController } from "./getUserApplications";
import { createChatController } from "./chatController";
import { getCountController } from "./getCountController";
import { getApplicationDetailsController } from "./getApplicationDetails";
import { getChatController } from "./chatController/getChatController";
import { createMessageController } from "./chatController/createMessageController";
import { getMessageController } from "./chatController/getMessages";
import { getAdminDashboardController } from "./adminChartController";
import { getCompanyDashboardController } from "./companyDashboardController";
import { getUserDashboardController } from "./userDashboardController";
import { getInterviewStatusController, getUserInterviewScheduleController } from "./getInterviewStatusController";
import { rescheduleInterviewController } from "./rescheduleInterviewController";


export const controller=(dependencies:IDependencies)=>{
    return {
        jobPost:postJobController(dependencies),
        listJobs:listJobsController(dependencies),
        getAllJobs:getAllJobsController(dependencies),
        addUser:addUserController(dependencies),
        applyJob:applyJobController(dependencies),
        getAllUser:getAllUserController(dependencies),
        deleteJob:deleteJobsController(dependencies),
        getAllData:getAllDataController(dependencies),
        saveJobs:saveJobController(dependencies),
        savedJobs:getSavedJobsController(dependencies),
        getUserDetailsByJob:getUserDetailsByJobController(dependencies),
        updateHiringStatus:updateStatusController(dependencies),
        getApplication:getApplicationByUserController(dependencies),
        getApplicationDetails:getApplicationDetailsController(dependencies),
        getCount:getCountController(dependencies),
        getAdminDashboard:getAdminDashboardController(dependencies),
        getCompanyDashboard:getCompanyDashboardController(dependencies),
        getUserDashboard:getUserDashboardController(dependencies),
        interviewSchedule:getInterviewStatusController(dependencies),
        getScheduledInterview:getUserInterviewScheduleController(dependencies),
        rescheduleInterview:rescheduleInterviewController(dependencies),
        
        //chat controllers
        createChat:createChatController(dependencies),
        getChat:getChatController(dependencies),
        createMessage:createMessageController(dependencies),
        getMessages:getMessageController(dependencies),



    }
}