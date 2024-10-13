import { getApplicationPayload, IGetUserApplicationResponse } from "utils/types/types";

export interface IGetApplicationByUserUsecase{
    execute(data:getApplicationPayload):Promise<IGetUserApplicationResponse|null>
}