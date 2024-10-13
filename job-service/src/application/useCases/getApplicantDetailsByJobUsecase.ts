import { IDependencies } from "application/interfaces/IDependencies";


export const getApplicantDetailsByJobUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getApplicantDetailsByJob}}=dependencies
    return{
        execute:async(jobId:string)=>{
            try {
                return await getApplicantDetailsByJob(jobId)
            } catch (error) {
                throw error
            }
        }
    }
}
