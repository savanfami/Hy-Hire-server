import { IDependencies } from "application/interfaces/IDependencies";
import { IRescheduleInterviewPayload } from "utils/types/types";

export const rescheduleInterviewUsecase=(dependencies:IDependencies)=>{
    const {repositories:{rescheduleInterview}}=dependencies
    return {
        execute:async (data:IRescheduleInterviewPayload)=>{
            try{
             return await rescheduleInterview(data)
            }catch(error){
                throw error
            }
        }
    }
}