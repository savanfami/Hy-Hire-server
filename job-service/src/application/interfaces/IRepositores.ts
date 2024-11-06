import { jobEntity, JobResponse } from "domain/entities";
import { UserEntity } from "domain/entities/userEntity";
import { DashboardStatistics, getalljobInterface, getApplicationPayload, IApplicantDetails, IChatpayload, ICountResponse, ICreateMessagePayload, IDashboardStats, IGetApplicationDetailsResponse, IgetChatResponse, IgetInterviewStatus, IGetUserApplicationResponse, IgetUserInteviewSchedules, IJobFilterParams, IMessageResponse, IRescheduleInterviewPayload, IUpdateStatusPayload, IUserDashboardResponse } from "utils/types/types";


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
    getAdminDashboardData():Promise<IDashboardStats|null>
    getCompanyDashboardData(id:string):Promise<DashboardStatistics|null>
    getUserDashboardData(id:string):Promise<IUserDashboardResponse|null>
    interviewSchedule(id:string):Promise<IgetInterviewStatus|null>
    getUserinterviewSchedules(userId:string):Promise<IgetUserInteviewSchedules[]|null>
    rescheduleInterview(data:IRescheduleInterviewPayload):Promise<boolean|null>

    createChat(data:IChatpayload):Promise<boolean|null>
    getChat(userId:string,role:string):Promise<IgetChatResponse[]|null>
    createMessage(data:ICreateMessagePayload):Promise<IMessageResponse|null>
    getMessages(chatId:string):Promise<IMessageResponse[]|null>

}