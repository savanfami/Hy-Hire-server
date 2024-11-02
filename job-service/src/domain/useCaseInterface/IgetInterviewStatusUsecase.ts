import { IgetInterviewStatus } from "utils/types/types";

export interface IgetInterviewStatusUsecase{
    execute(id:string):Promise<IgetInterviewStatus|null>
}