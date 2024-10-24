import { IDependencies } from "application/interfaces/IDependencies";

export const getMessagesUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getMessages}}=dependencies
    return {
        execute:async(chatId:string)=>{
            try {
                return await getMessages(chatId)
            } catch (error) {
                throw error
            }
        }
    }
}