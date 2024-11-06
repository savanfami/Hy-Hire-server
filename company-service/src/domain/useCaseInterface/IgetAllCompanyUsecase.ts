import { ICompanySearchParams, IPaginatedCompaniesResponse } from "utils/types/allTypes";


export interface IgetAllCompanyUsecase{
    execute(data:ICompanySearchParams):Promise<IPaginatedCompaniesResponse|null>
}