import { IGetApplicationDetailsResponse } from "utils/types/types";

export interface IgetApplicationDetailsUsecase{
    execute(id:string):Promise<IGetApplicationDetailsResponse|null>
}