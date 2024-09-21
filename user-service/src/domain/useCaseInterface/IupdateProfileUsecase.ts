import { UserEntity } from "domain/entity";


export interface IupdateProfileUsecase{
  execute(email:string,data:UserEntity):Promise<UserEntity|null>
}