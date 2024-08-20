import {UserEntity} from '../entities/userEntity'

export interface IcreateUserUsecase{
    execute(data:UserEntity):Promise<UserEntity|null>
}