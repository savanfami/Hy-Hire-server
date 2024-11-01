import { userModel } from "../model/userMode";
import { companyModel } from "../model/companyModel";
import { jobModel } from "../model/jobModel";
import { applicantModel } from "../model/applicantModel";
import {getMonthlyStats} from '../../helper/helper'
import { IDashboardStats } from "utils/types/types";
export const getAdminDashboardData=async():Promise<IDashboardStats|null>=>{
    try {
        const [totalUsers, totalCompanies, totalJobs, totalHired, monthlyData] = await Promise.all([
            userModel.countDocuments(),
            companyModel.countDocuments({isBlocked:false}),
            jobModel.countDocuments(),
            applicantModel.countDocuments({ hiringStatus: 'hired' }),
            getMonthlyStats()
          ]);
          return {
            totalUsers,
            totalCompanies,
            totalJobs,
            totalHired,
            monthlyData
          }
    } catch (error:any) {
        throw new Error(error?.message);
    }
}