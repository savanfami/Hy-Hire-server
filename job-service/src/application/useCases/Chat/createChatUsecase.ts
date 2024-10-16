import { IDependencies } from "application/interfaces/IDependencies";
import { IChatpayload } from "utils/types/types";

export const createChatUsecase=(dependencies:IDependencies)=>{
    const {repositories:{createChat}}=dependencies
    return {
        execute:async(data:IChatpayload)=>{
            try {
                return await createChat(data)
                
            } catch (error) {
                throw error
            }
        }
    }
}