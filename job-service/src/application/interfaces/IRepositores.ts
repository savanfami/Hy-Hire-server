import { jobEntity, JobResponse } from "domain/entities";
import { UserEntity } from "domain/entities/userEntity";
import { getalljobInterface, getApplicationPayload, IApplicantDetails, IChatpayload, ICountResponse, ICreateMessagePayload, IGetApplicationDetailsResponse, IgetChatResponse, IGetUserApplicationResponse, IJobFilterParams, IMessageResponse, IUpdateStatusPayload } from "utils/types/types";


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
    getCount():Promise<ICountResponse|null>
    getApplicationDetails(id:string):Promise<IGetApplicationDetailsResponse|null>

    createChat(data:IChatpayload):Promise<boolean|null>
    getChat(userId:string,role:string):Promise<IgetChatResponse[]|null>
    createMessage(data:ICreateMessagePayload):Promise<IMessageResponse|null>
    getMessages(chatId:string):Promise<IMessageResponse[]|null>
}