import { IDependencies } from "application/interfaces/IDependencies";

export const getChatUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getChat}}=dependencies
    return {
        execute:async(userId:string,role:string)=>{
            try {
                return await getChat(userId,role)
            } catch (error) {
                throw error
            }
        }
    }
}