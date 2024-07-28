import {IUserEntity} from '../entities/userEntity'

export interface IloginuserUsecase{
    execute(email:string,password:string):Promise<IUserEntity|null>
}