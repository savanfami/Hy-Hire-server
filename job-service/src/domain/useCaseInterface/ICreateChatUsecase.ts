import { IChatpayload } from "utils/types/types";

export interface ICreateChatUsecase{
    execute(data:IChatpayload):Promise<boolean|null>
}