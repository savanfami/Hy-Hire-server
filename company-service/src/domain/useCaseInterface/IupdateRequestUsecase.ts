import {  IUpdateRequestPayload, IUpdateRequestResponse } from "utils/types/allTypes";


export interface IupdateRequestUsecase {
    execute(id: string, updatePayload: IUpdateRequestPayload): Promise<IUpdateRequestResponse|null>
}