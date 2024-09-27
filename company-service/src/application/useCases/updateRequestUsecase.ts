import { IDependencies } from "application/interfaces/IDependencies";
import { IUpdateRequestPayload } from "utils/types/allTypes";


export const updateRequestUsecase=(dependencies:IDependencies)=>{
    const {repositories:{updateRequest}}=dependencies
    return {
        execute:async(id:string,updatePayload:IUpdateRequestPayload)=>{
            try{
                return await updateRequest(id,updatePayload)
            }catch(error:any){
                throw error
            }
        }
    }
}