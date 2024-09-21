import { IDependencies } from "application/interfaces/IDependencies";


export const getJobUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getJob}}=dependencies
    return{
        execute:async(companyId:string,page:number,search:string)=>{
            try {
                return getJob(companyId,page,search)
            } catch (error) {
                throw error
            }
        }
    }
}
