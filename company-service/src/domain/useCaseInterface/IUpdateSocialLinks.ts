import { SocialLinks } from "infrastructure/database/mongodb/model/companyModel";
import { CompanyEntity } from "../entities/companyEntity";

export interface IupdateSocialLinks{
    execute (data:SocialLinks,email:string):Promise<CompanyEntity|null>
}