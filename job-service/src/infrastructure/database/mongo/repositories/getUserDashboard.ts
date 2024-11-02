import mongoose from "mongoose";
import { applicantModel } from "../model/applicantModel";
import { userModel } from "../model/userMode"
import { IUserDashboardResponse } from "utils/types/types";



export const getUserDashboardData = async (id: string): Promise<IUserDashboardResponse> => {
    const userId = new mongoose.Types.ObjectId(id);

    try {
        const totalApplications = await applicantModel.countDocuments({ userId });

        const interviewsScheduled = await applicantModel.countDocuments({
            userId,
            'schedule.status': { $nin: ['completed'] },
            hiringStatus: { $in: ['interview', 'shortlisted'] }
        });

        const savedJobsCount = await userModel.findById(userId)
            .select('savedJobs')
            .then(user => user?.savedJobs?.length || 0);

        const applicationStatusDistribution = await applicantModel.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: '$hiringStatus',
                    count: { $sum: 1 }
                }
            }
        ]);

        const monthlyApplications = await applicantModel.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    applications: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
            {
                $project: {
                    month: {
                        $arrayElemAt: [
                            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            { $subtract: ['$_id.month', 1] }
                        ]
                    },
                    applications: 1
                }
            }
        ]);

        const jobTypeApplications = await applicantModel.aggregate([
            { $match: { userId } },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            { $unwind: '$jobDetails' },
            {
                $group: {
                    _id: '$jobDetails.employmentType',
                    applications: { $sum: 1 }
                }
            }
        ]);

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const todayInterviews = await applicantModel.aggregate([
            {
                $match: {
                    userId,
                    'schedule.status': { $in: ['pending', 'confirmed'] },
                    hiringStatus: { $in: ['interview', 'shortlisted'] }
                }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            { $unwind: '$jobDetails' },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companyDetails'
                }
            },
            { $unwind: '$companyDetails' },
            {
                $match: {
                    'schedule.interviewDate': {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            },
            {
                $project: {
                    companyName: '$companyDetails.name',  
                    jobTitle: '$jobDetails.jobTitle',
                    interviewTime: '$schedule.interviewTime'
                }
            }
        ]);
        

        // console.log(todayInterviews, 'today interview')


        return {
            totalApplications,
            interviewsScheduled,
            savedJobsCount,
            applicationStatusDistribution: applicationStatusDistribution.map(item => ({
                status: item._id,
                count: item.count
            })),
            monthlyApplications: monthlyApplications.map(item => ({
                month: item.month,
                applications: item.applications
            })),
            jobTypeApplications: jobTypeApplications.map(item => ({
                type: item._id,
                applications: item.applications
            })),
            todayInterviews: todayInterviews
        };
    } catch (error: any) {
        throw new Error(`Error fetching dashboard data: ${error.message}`);
    }
};
