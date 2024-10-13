import { IDependencies } from "application/interfaces/IDependencies";


export const saveJobUsecase=(dependencies:IDependencies)=>{
    const {repositories:{saveJob}}=dependencies
    return{
        execute:async(jobId:string,userId:string)=>{
            try {
                return saveJob(jobId,userId)
            } catch (error) {
                throw error
            }
        }
    }
}
