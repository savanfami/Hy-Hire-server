import { IgetChatResponse } from "utils/types/types";

export interface IgetChatUsecase{
    execute(userId:string,role:string):Promise<IgetChatResponse[]|null>
}