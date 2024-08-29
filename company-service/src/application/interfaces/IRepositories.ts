import { CompanyEntity } from "domain/entities/index";
import { SocialLinks } from "infrastructure/database/mongodb/model/companyModel";



export interface IRepositories {
    updateProfile: (data: CompanyEntity, email: string) => Promise<CompanyEntity | null>
    findByEmail:(email:string)=>Promise<CompanyEntity|null>
    updateSocialLinks:(data:SocialLinks,email:string)=>Promise<CompanyEntity|null>

}