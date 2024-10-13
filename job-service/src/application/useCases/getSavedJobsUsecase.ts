import { IDependencies } from "application/interfaces/IDependencies";


export const savedJobUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getSavedJobs}}=dependencies
    return{
        execute:async(userId:string)=>{
            try {
                return  await getSavedJobs(userId)
            } catch (error) {
                throw error
            }
        }
    }
}
