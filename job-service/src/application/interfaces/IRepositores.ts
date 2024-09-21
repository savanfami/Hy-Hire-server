import { jobEntity, JobResponse } from "domain/entities";
import { UserEntity } from "domain/entities/userEntity";
import { getalljobInterface } from "utils/types/types";


export interface IRepositories{
    postJob(data:jobEntity):Promise<jobEntity|null>
    getJob(companyId:string,page:number,search:string):Promise<JobResponse|null>
    getAllJobs():Promise<getalljobInterface[]|null>
    addUser(data:UserEntity):Promise<boolean|null>
}