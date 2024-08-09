import { IDependencies } from "application/interfaces/IDependencies";


export const loginuserUsecase =(dependencies:IDependencies) => {
    const {repositories:{userLogin}} = dependencies
    return {
        execute: async (email:string,password:string) => {
            try {
                return await userLogin(email,password)
            } catch (error) {
                throw error
            }
        }
    }
}