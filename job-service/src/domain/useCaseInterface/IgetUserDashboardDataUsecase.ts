import { IUserDashboardResponse } from "utils/types/types";

export interface IgetUserDashboardDataUsecase{
    execute(id:string):Promise<IUserDashboardResponse|null>
}