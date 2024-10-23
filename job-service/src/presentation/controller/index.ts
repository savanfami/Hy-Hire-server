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

        //chat controllers
        createChat:createChatController(dependencies),
        getChat:getChatController(dependencies),
        createMessage:createMessageController(dependencies),
    }
}