import { CompanyEntity } from "../entities/companyEntity";

export interface IgetCompanyUseCase{
    execute (email:string):Promise<CompanyEntity|null>
}