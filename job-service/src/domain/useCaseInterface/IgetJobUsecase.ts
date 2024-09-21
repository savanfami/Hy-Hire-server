import { JobResponse } from "domain/entities";

export interface IgetJobUsecase{
    execute(companyId:string,page:number,search:string):Promise<JobResponse|null>
}