import { ICreateMessagePayload, IMessageResponse } from "utils/types/types";

export interface ICreateMessageUsecase{
    execute(data:ICreateMessagePayload):Promise<IMessageResponse|null>
}