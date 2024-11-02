import { DashboardStatistics } from "utils/types/types";

export interface IgetCompanyDashboardData{
    execute(id:string):Promise<DashboardStatistics|null>
}