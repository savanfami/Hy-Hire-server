import { ApprovalStatus } from "utils/types/allTypes";


export interface IupdateRequestUsecase {
    execute(id: string, status: string): Promise<{email:string,status:ApprovalStatus,name:string}|null>
}