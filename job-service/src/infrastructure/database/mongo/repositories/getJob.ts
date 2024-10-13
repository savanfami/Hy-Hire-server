import { jobEntity, JobResponse } from "domain/entities";
import { jobModel } from "../model/jobModel";



export const getJob = async (companyId: string, page: number, search: string): Promise<JobResponse | null> => {
    const query: any = {
        companyId: companyId,
    }
    if (search) {
        query.$or = [
            { jobTitle: { $regex: search, $options: 'i' } },
            { employmentType: { $regex: search, $options: 'i' } }
        ]
    }
    try {
        const count = await jobModel.find()
        const TotalJobs = count.length;
        const findJobs = await jobModel.find(query).sort({ createdAt: -1 });
        const data = await Promise.all([TotalJobs, findJobs])
        if (data) {
            return {
                jobs: findJobs as unknown as jobEntity[],
                TotalJobs
            }
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
