import { IApplicantDetails } from "utils/types/types";

export interface IgetApplicantDetailsByJobUsecase{
    execute(jobId:string):Promise<IApplicantDetails[]|null>
}