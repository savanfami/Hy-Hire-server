import { CompanyEntity } from "../entities/companyEntity";

export interface IupdateProfileUseCase{
    execute (data:CompanyEntity,email:string):Promise<CompanyEntity|null>
}