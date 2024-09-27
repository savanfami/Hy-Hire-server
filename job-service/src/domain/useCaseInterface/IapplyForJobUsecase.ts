import { getalljobInterface } from "utils/types/types";


export interface IapplyForJobUsecase{
    execute(companyId:string,resume:string,jobId:string,userId:string):Promise<boolean|null>
}