import { IDependencies } from "application/interfaces/IDependencies";
import { UserEntity } from "domain/entities";

export const verifyotpUsecase=(dependencies:IDependencies)=>{
    const {repositories:{verifyOtp}}=dependencies
    return {
        execute:async(data:UserEntity)=>{
            try{
                return await verifyOtp(data)
                 
            
            }catch(error:any|Error){
                throw error
            }
        }
    
    }
}