import { IDependencies } from "application/interfaces/IDependencies";

export const updateRescheduleUsecase=(dependencies:IDependencies)=>{
    const {repositories:{updateReschedule}}=dependencies
    return {
        execute:async (data:any)=>{
            try{
             return await updateReschedule(data)
            }catch(error){
                throw error
            }
        }
    }
}