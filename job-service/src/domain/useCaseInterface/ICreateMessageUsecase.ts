import { ICreateMessagePayload } from "utils/types/types";

export interface ICreateMessageUsecase{
    execute(data:ICreateMessagePayload):Promise<boolean|null>
}