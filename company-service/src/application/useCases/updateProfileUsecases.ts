import { IDependencies } from "application/interfaces/IDependencies";
import { CompanyEntity } from "domain/entities/companyEntity"

export const updateProfileUsecase = (dependencies:IDependencies) => {
    const {
        repositories: { updateProfile } } = dependencies
    return {
        execute: async (data:CompanyEntity,email:string) => {
            try {
                
                return await updateProfile(data,email)

            } catch (error) {
                throw Error
            }
        } 
    }
}
