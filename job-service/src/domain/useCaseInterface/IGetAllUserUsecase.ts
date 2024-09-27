import { UserEntity } from "domain/entities/userEntity";

export interface IGetAllUserUsecase{
    execute():Promise<UserEntity[]|null>
}