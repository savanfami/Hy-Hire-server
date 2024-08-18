import { IDependencies } from "application/interfaces/IDependencies";

export const updatePasswordUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { updatePassword } } = dependencies
    return {
        execute: async (email: string,password:string) => {
            try {
                return await updatePassword(email,password)

            } catch (error) {
                throw Error
            }
        } 
    }
}
