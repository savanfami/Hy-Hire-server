import { UserEntity } from "domain/entities";

export interface IUpdatePasswordUsecase{
    execute(email:string,password:string):Promise<UserEntity|null>
}