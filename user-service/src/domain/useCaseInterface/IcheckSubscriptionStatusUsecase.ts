import { ICheckSuscriptionResponse } from "utils/types/types";

export interface IcheckSubscriptionStatusUsecase {
    execute(userId:string):Promise<ICheckSuscriptionResponse|null>
}