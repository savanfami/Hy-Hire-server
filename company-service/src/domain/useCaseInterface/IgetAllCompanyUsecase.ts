import { CompanyEntity } from "domain/entities";


export interface IgetAllCompanyUsecase{
    execute():Promise<CompanyEntity[]|null>
}