import { IDependencies } from "application/interfaces/IDependencies";
import { ICreateMessagePayload } from "utils/types/types";

export const createMessageUsecase=(dependencies:IDependencies)=>{
    const {repositories:{createMessage}}=dependencies
    return {
        execute:async(data:ICreateMessagePayload)=>{
            try {
                return await createMessage(data)
            } catch (error) {
                throw error
            }
        }
    }
}