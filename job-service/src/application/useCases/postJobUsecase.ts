import { jobEntity } from "domain/entities";
import { IDependencies } from "application/interfaces/IDependencies";

export const postJobUsecase=(dependencies:IDependencies)=>{
    const {repositories:{postJob}}=dependencies
    return {
        execute:async (data:jobEntity)=>{
            try{

             return await postJob(data)

            }catch(error){
                throw error
            }
        }
    }
}