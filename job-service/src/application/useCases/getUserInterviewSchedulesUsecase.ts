import { IDependencies } from "application/interfaces/IDependencies";



export const getUserInterviewSchedulesUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getUserinterviewSchedules}}=dependencies
    return {
        execute:async(userId:string)=>{
            try {
                return await getUserinterviewSchedules(userId)
            } catch (error) {
                throw error
            }
        }
    }
}