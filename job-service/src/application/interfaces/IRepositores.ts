import { jobEntity, JobResponse } from "domain/entities";
import { UserEntity } from "domain/entities/userEntity";
import { getalljobInterface, IJobFilterParams } from "utils/types/types";


export interface IRepositories{
    postJob(data:jobEntity):Promise<jobEntity|null>
    getJob(companyId:string,page:number,search:string):Promise<JobResponse|null>
    getAllJobs(data:IJobFilterParams):Promise<getalljobInterface[]|null>
    addUser(data:UserEntity):Promise<boolean|null>
    applyJob(companyId:string,userId:string,jobId:string,resume:string):Promise<boolean|null>
    getAllUser():Promise<UserEntity[]|null>
    deleteJobs(jobId:string):Promise<boolean|null>
}