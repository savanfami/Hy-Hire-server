import { CompanyEntity } from "../entities/companyEntity";

export interface IlistRequestUsecase{
    execute ():Promise<CompanyEntity|null>
}