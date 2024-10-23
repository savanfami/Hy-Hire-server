import { ICountResponse } from "utils/types/types";
import { userModel } from "../model/userMode";
import { companyModel } from "../model/companyModel";
import { jobModel } from "../model/jobModel";

export const getCount = async (): Promise<ICountResponse | null> => {
    try {

        const [totalUsers, totalCompanies, totalJobs] = await Promise.all([
            userModel.find().countDocuments(),
            companyModel.find().countDocuments(),
            jobModel.find({ expired: false }).countDocuments()
        ])

        return {
            totalUsers,
            totalCompanies,
            totalJobs
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }
}