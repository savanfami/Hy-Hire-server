import { ICountResponse } from "utils/types/types";

export interface IGetCountUsecase{
    execute():Promise<ICountResponse|null>
}