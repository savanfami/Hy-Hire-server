import { UserEntity } from "domain/entity";


export interface IRepositories{
    getAllUser:()=>Promise<UserEntity[]|null>
    updateProfile:(email:string,data:UserEntity)=>Promise<UserEntity|null>
    getUserData:(email:string)=>Promise<UserEntity|null>
}