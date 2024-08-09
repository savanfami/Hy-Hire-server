import {UserEntity} from '../entities/userEntity'

export interface IloginuserUsecase{
    execute(email:string,password:string):Promise<UserEntity|null>
}