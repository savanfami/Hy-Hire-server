import { IUpdateStatusPayload } from "utils/types/types";

export interface IUpdateHiringStatusUsecase{
    execute(payload:IUpdateStatusPayload):Promise<any|null>
}