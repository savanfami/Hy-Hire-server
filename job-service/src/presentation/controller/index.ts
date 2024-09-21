import { IDependencies } from "application/interfaces/IDependencies";
import { postJobController } from "./postJobController";
import { listJobsController } from "./listJobs";
import { getAllJobsController } from "./getAllJobs";
import { addUserController } from "./addUser";


export const controller=(dependencies:IDependencies)=>{
    return {
        jobPost:postJobController(dependencies),
        listJobs:listJobsController(dependencies),
        getAllJobs:getAllJobsController(dependencies),
        addUser:addUserController(dependencies)
    }
}