import { UserEntity } from "domain/entity";



export interface IgetUserDataUsecase{
    execute(email:string):Promise<UserEntity|null>
}