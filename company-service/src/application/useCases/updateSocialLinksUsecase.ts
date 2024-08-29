import { IDependencies } from "application/interfaces/IDependencies";
import { SocialLinks } from "infrastructure/database/mongodb/model/companyModel";
// import { CompanyEntity } from "domain/entities/companyEntity"

export const updateSocialLinksUsecase = (dependencies:IDependencies) => {
    const {
        repositories: { updateSocialLinks } } = dependencies
    return {
        execute: async (data:SocialLinks,email:string) => {
            try {
                
                return await updateSocialLinks(data,email)

            } catch (error) {
                throw Error
            }
        } 
    }
}
