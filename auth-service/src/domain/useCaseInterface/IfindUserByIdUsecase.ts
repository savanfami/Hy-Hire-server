import { UserEntity } from "../entities/userEntity";

export interface IfindUserByIdUsecase{
    execute(id:string):Promise<UserEntity|null>
}