import { IDependencies } from "application/interfaces/IDependencies";



export const getInterviewStatusUsecase=(dependencies:IDependencies)=>{
    const {repositories:{interviewSchedule}}=dependencies
    return {
        execute:async(id:string)=>{
            try {
                return await interviewSchedule(id)
            } catch (error) {
                throw error
            }
        }
    }
}