import { IGetSubscriptionResponse } from "utils/types/types";

export interface IgetSubscriptionsUsecase{
    execute():Promise<IGetSubscriptionResponse|null>
}