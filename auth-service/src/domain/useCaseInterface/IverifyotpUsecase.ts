import { UserEntity } from "domain/entities";


export interface IverifyotpUsecase {
    execute(data:UserEntity):Promise<UserEntity|null>
}