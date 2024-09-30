import { CompanyEntity } from "domain/entities/index";
import { SocialLinks } from "infrastructure/database/mongodb/model/companyModel";
import {  ICompanySearchParams, IPaginatedCompaniesResponse, IUpdateRequestPayload, IUpdateRequestResponse } from "utils/types/allTypes";



export interface IRepositories {
    updateProfile: (data: CompanyEntity, email: string) => Promise<CompanyEntity | null>
    findByEmail:(email:string)=>Promise<CompanyEntity|null>
    updateSocialLinks:(data:SocialLinks,email:string)=>Promise<CompanyEntity|null>
    sendRequest:(email:string)=>Promise<boolean|null> 
    listRequest:()=>Promise<CompanyEntity|null>
    updateRequest:(id:string,updatePayload:IUpdateRequestPayload)=>Promise<IUpdateRequestResponse|null>
    getAllCompany:(data:ICompanySearchParams)=>Promise<IPaginatedCompaniesResponse|null>
}