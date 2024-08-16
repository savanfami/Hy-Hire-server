import { UserEntity } from "domain/entity";


export interface IRepositories{
    getAllUser:()=>Promise<UserEntity[]|null>
}