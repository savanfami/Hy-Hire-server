import { UserEntity } from "domain/entities"

export interface IverifyemailUsecase{
    execute(email:string):Promise<UserEntity|null>
}