import { IUpdateRescheduleData } from "utils/types/types";

export interface IupdateRescheduleUsecase{
    execute(data:IUpdateRescheduleData):Promise<boolean|null>
}