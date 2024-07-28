import {UserEntity} from '../entities/userEntity'

export interface ISigupuserUsecase{
    execute(data:UserEntity):Promise<UserEntity|null>
}