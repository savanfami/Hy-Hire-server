import { IMessageResponse } from "utils/types/types";

export interface IgetMessageUsecase{
    execute(chatId:string):Promise<IMessageResponse[]|null>
}