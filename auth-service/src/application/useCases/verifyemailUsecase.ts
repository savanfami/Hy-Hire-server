import { IDependencies } from "application/interfaces/IDependencies";

export const findUserByEmailUsecase=(dependencies:IDependencies)=>{
    const {repositories:{checkEmail}} =dependencies
    return {
        execute:async (email:string)=>{
            return await checkEmail(email)
        }
    }
}