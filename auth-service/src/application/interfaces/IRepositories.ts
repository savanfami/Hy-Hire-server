import {UserEntity} from 'domain/entities'

export interface IRepositories{
    signup:(data:UserEntity)=>Promise<UserEntity|null>
    verifyOtp:(data:UserEntity)=>Promise<UserEntity|null>
    userLogin:(email:string,password:string)=>Promise<UserEntity|null>
    checkEmail:(email:string)=>Promise<UserEntity|null>
    findUserById:(id:string)=>Promise<UserEntity|null>
    updatePassword:(email:string,password:string)=>Promise<UserEntity|null>
    createUser:(data:UserEntity)=>Promise<UserEntity|null>
    findByIdandUpdate:(id:string)=>Promise<UserEntity|null>
    // addUser(data:UserEntity):Promise<boolean|null>

}