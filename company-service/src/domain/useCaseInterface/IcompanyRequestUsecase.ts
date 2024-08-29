import { CompanyEntity } from "../entities/companyEntity";

export interface IcompanyRequestUseCase{
    execute (email:string):Promise<CompanyEntity|null>
}