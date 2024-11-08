import {UserEntity} from '../entities/userEntity'

export interface IsignupCompanyUsecase{
    execute(data:UserEntity):Promise<UserEntity|null>
}


