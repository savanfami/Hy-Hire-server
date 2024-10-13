import { jobEntity, JobResponse } from "domain/entities";
import { UserEntity } from "domain/entities/userEntity";
import { getalljobInterface, getApplicationPayload, IApplicantDetails, IGetUserApplicationResponse, IJobFilterParams, IUpdateStatusPayload, Job } from "utils/types/types";


export interface IRepositories{
    postJob(data:jobEntity):Promise<jobEntity|null>
    getJob(companyId:string,page:number,search:string):Promise<JobResponse|null>
    getAllJobs(data:IJobFilterParams):Promise<getalljobInterface[]|null>
    addUser(data:UserEntity):Promise<boolean|null>
    applyJob(companyId:string,userId:string,jobId:string,resume:string):Promise<boolean|null>
    getAllUser():Promise<UserEntity[]|null>
    deleteJobs(jobId:string):Promise<boolean|null>
    getAllData():Promise<any|null>
    saveJob(jobId:string,userId:string):Promise<boolean|null>
    getSavedJobs(userId:string):Promise<any|null>
    getApplicantDetailsByJob(jobId:string):Promise<IApplicantDetails[]|null>
    updateStatus(payload:IUpdateStatusPayload):Promise<any|null>
    getApplicationsByUser(data:getApplicationPayload):Promise<IGetUserApplicationResponse|null>
}