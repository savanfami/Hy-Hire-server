import { UserEntity } from "domain/entity";


export interface IgetallUserUsecase{
  execute():Promise<UserEntity[]|null>
}