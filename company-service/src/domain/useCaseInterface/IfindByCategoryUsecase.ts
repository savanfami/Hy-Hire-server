import { CompanyEntity } from "domain/entities";


export interface IfindByCategoryUsecase{
    execute(name:string):Promise<CompanyEntity[]|null>
}