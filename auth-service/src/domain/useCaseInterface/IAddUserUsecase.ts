import { UserEntity } from "domain/entities/userEntity";

export interface IAddUserUsecase{
    execute(data:UserEntity):Promise<boolean|null>
}