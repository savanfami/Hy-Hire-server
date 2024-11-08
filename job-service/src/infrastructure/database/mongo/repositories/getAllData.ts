import { jobModel } from "../model/jobModel";

const getStartAndEndOfWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); 
    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6)); 

    firstDayOfWeek.setHours(0, 0, 0, 0);
    lastDayOfWeek.setHours(23, 59, 59, 999);
    return { firstDayOfWeek, lastDayOfWeek };
};

export const getAllData = async (): Promise<any | null> => {
    try {
        const { firstDayOfWeek, lastDayOfWeek } = getStartAndEndOfWeek();

        const jobsWithDetails = await jobModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDayOfWeek,
                        $lte: lastDayOfWeek
                    },
                    expired: false 
                }
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companyDetails'
                }
            },
            {
                $unwind: {
                    path: '$companyDetails',
                }
            },
            {
                $project: {
                    jobTitle: 1,
                    employmentType: 1,
                    joblocation: 1,
                    salaryMin: 1,
                    salaryMax: 1,
                    endDate: 1,
                    experience: 1,
                    responsibilityInput: 1,
                    skillInput: 1,
                    jobDescription: 1,
                    qualificationInput: 1,
                    createdAt: 1,
                    companyDetails: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        website: 1,
                        location: 1,
                        foundedDate: 1,
                        sector: 1,
                        subIndustry: 1,
                        description: 1,
                        icon: 1,
                        socialLinks: 1,
                    }
                }
            }
        ]);
        return {
            jobsWithDetails
          };
    } catch (error: any) {
        throw new Error("An unexpected error occurred.");
    }
}
