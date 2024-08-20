import {UserEntity} from '../entities/userEntity'

export interface IfindbyIdandUpdateUsecase{
    execute(id:string):Promise<UserEntity|null>
}