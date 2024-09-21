import { IDependencies } from "application/interfaces/IDependencies";


export const updateRequestUsecase=(dependencies:IDependencies)=>{
    const {repositories:{updateRequest}}=dependencies
    return {
        execute:async(id:string,status:string)=>{
            try{
                return await updateRequest(id,status)
            }catch(error:any){
                throw error
            }
        }
    }
}