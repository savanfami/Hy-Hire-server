import {UserEntity} from 'domain/entities'

export interface IRepositories{
    signup:(data:UserEntity)=>Promise<UserEntity|null>
}