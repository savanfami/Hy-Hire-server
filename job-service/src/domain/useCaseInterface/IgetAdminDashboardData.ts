import { IDashboardStats } from "utils/types/types";

export interface IgetAdminDashboardData{
    execute():Promise<IDashboardStats|null>
}