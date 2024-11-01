import { userModel } from "../mongo/model/userMode";
import { companyModel } from "../mongo/model/companyModel";
import { jobModel } from "../mongo/model/jobModel";
import { applicantModel } from "../mongo/model/applicantModel";
import { IMonthlyData } from "utils/types/types";

export const getMonthlyStats = async (): Promise<IMonthlyData[]> => {
    const last6Months: IMonthlyData[] = [];
    const currentDate = new Date();
  
    for (let i = 0; i < 6; i++) {
      const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
  
      const [users, companies, jobs, hired] = await Promise.all([
        userModel.countDocuments({
          createdAt: {
            $gte: currentMonth,
            $lte: nextMonth,
          },
        }),
        companyModel.countDocuments({
          createdAt: {
            $gte: currentMonth,
            $lte: nextMonth,
          },
          isBlocked:false
        }),
        jobModel.countDocuments({
          createdAt: {
            $gte: currentMonth,
            $lte: nextMonth,
          },
        }),
        applicantModel.countDocuments({
          hiringStatus: 'hired',
          updatedAt: {
            $gte: currentMonth,
            $lte: nextMonth,
          },
        }),
      ]);
  
      last6Months.unshift({
        name: currentMonth.toLocaleString('default', { month: 'short' }),
        users,
        companies,
        jobs,
        hired,
      });
    }

    console.log(last6Months)

    return last6Months;
  };