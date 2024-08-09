import {UserEntity} from 'domain/entities'

export interface IRepositories{
    signup:(data:UserEntity)=>Promise<UserEntity|null>
    verifyOtp:(data:UserEntity)=>Promise<UserEntity|null>
    userLogin:(email:string,password:string)=>Promise<UserEntity|null>
    checkEmail:(email:string)=>Promise<boolean>
}