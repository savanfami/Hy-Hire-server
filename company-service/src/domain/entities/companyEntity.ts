import { SocialLinks } from "infrastructure/database/mongodb/model/companyModel";

export interface CompanyEntity{
    name?:string;
    email?:string;
    password?:string;
    isBlocked?:boolean;
    companyDescription?:string;
    contact?:string;
    location?:string;
    foundedDate?:Date;
    subIndustry?:string
    website?:string;
    icon?:string;
    sector?:string;
    socialLinks?:SocialLinks;
}

