import { IDependencies } from "application/interfaces/IDependencies";


export const companyRequestUseCase=(dependencies:IDependencies)=>{
    
    return {
        execute:async (email:string)=>{

            try{
     
            // return await email
    
            }catch(error:any){
                throw error
            }
        }
    }

}