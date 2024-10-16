import { UserEntity } from "domain/entity";
import { getAllUserResponse, ICheckSuscriptionResponse, IGetSubscriptionResponse, IsearchUser } from "utils/types/types";


export interface IRepositories{
    getAllUser:(data:IsearchUser)=>Promise<getAllUserResponse|null>
    updateProfile:(email:string,data:UserEntity)=>Promise<UserEntity|null>
    getUserData:(email:string)=>Promise<UserEntity|null>
    getSubscriptionStatus:(userId:string)=>Promise<ICheckSuscriptionResponse|null>
    getSubscriptions:()=>Promise<IGetSubscriptionResponse|null>
} 