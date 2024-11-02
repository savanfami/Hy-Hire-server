import { jobModel } from "../model/jobModel";
import { applicantModel } from "../model/applicantModel";
import mongoose from "mongoose";
import { DashboardStatistics } from "utils/types/types";

export const getCompanyDashboardData = async (id: string): Promise<DashboardStatistics | null> => {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
        const companyId=new mongoose.Types.ObjectId(id)
        const jobsData = await jobModel.aggregate([
            {
                $match: { companyId: companyId }
            },
            {
                $facet: {
                    totalJobs: [
                        { $count: 'count' }
                    ],
                    expiredJobs: [
                        {
                            $match: { expired: true }
                        },
                        { $count: 'count' }
                    ],
                }
            }
        ]);


        const applicantsData = await applicantModel.aggregate([
            {
                $match: { companyId:companyId }
            },
            {
                $facet: {
                    totalApplicants: [
                        { $count: 'count' }
                    ],
                    todayInterviews: [
                        {
                            $match: {
                                'schedule.interviewDate': {
                                    $gte: startOfDay,
                                    $lte: endOfDay
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'userId',
                                foreignField: '_id',
                                as: 'userData'
                            }
                        },
                        {
                            $lookup: {
                                from: 'jobs',
                                localField: 'jobId',
                                foreignField: '_id',
                                as: 'jobData'
                            }
                        },
                        {
                            $project: {
                                candidateName: { $arrayElemAt: ['$userData.name', 0] },
                                jobTitle: { $arrayElemAt: ['$jobData.jobTitle', 0] },
                                interviewDate: '$schedule.interviewDate',
                                interviewTime: '$schedule.interviewTime',
                                status: '$schedule.status',
                                hiringStatus: 1
                            }
                        }
                    ],
                    applicationsByStatus: [
                        {
                            $group: {
                                _id: '$hiringStatus',
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    monthlyApplications: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
                                }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    month: { $month: '$createdAt' },
                                    year: { $year: '$createdAt' }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $sort: {
                                '_id.year': 1,
                                '_id.month': 1
                            }
                        }
                    ]
                }
            }
        ]);

        const dashboardData = {
            jobsStatistics: {
                totalJobs: jobsData[0].totalJobs[0]?.count || 0,
                expiredJobs: jobsData[0].expiredJobs[0]?.count || 0,
            },
            applicantsStatistics: {
                totalApplicants: applicantsData[0].totalApplicants[0]?.count || 0,
                todayInterviews: applicantsData[0].todayInterviews,
                applicationsByStatus: applicantsData[0].applicationsByStatus,
                monthlyApplications: applicantsData[0].monthlyApplications.map((item: { _id: { month: number; year: any; }; count: any; }) => ({
                    month: new Date(0, item._id.month - 1).toLocaleString('default', { month: 'short' }),
                    year: item._id.year,
                    count: item.count
                }))
            }
        };

        return dashboardData

    } catch (error: any) {
        throw new Error(`Error fetching dashboard data: ${error.message}`);
    }
};