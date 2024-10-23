import { getApplicationPayload, IGetUserApplicationResponse } from "utils/types/types";
import { applicantModel } from "../model/applicantModel";
import mongoose from "mongoose";


export const getApplicationsByUser = async (payload: getApplicationPayload): Promise<IGetUserApplicationResponse | null> => {
    try {
        const { userId, page, search } = payload;
        const UserObjectId = new mongoose.Types.ObjectId(userId);
        const limit = 10;
        const skip = (page - 1) * limit;
        const result = await applicantModel.aggregate([
            {
                $facet: {
                    applications: [
                        {
                            $match: {
                                userId: UserObjectId
                            }
                        },
                        {
                            $lookup: {
                                from: 'jobs',
                                localField: 'jobId',
                                foreignField: '_id',
                                as: 'job'
                            }
                        },
                        {
                            $lookup: {
                                from: 'companies',
                                localField: 'companyId',
                                foreignField: '_id',
                                as: 'company'
                            }
                        },
                        { $unwind: "$job" },
                        { $unwind: "$company" },
                        {
                            $match: {
                                $or: [
                                    { "company.name": { $regex: search, $options: "i" } },
                                    { "job.jobTitle": { $regex: search, $options: "i" } },
                                    { "hiringStatus": { $regex: search, $options: "i" } }
                                ]
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                companyName: "$company.name",
                                jobTitle: "$job.jobTitle",
                                hiringStatus: "$hiringStatus",
                                appliedDate: "$createdAt"
                            }
                        },
                        { $skip: skip },
                        { $limit: limit },
                        {$sort:{appliedDate:-1}}
                    ],
                    totalCount: [
                        {
                            $match: {
                                userId: UserObjectId
                            }
                        },
                        {
                            $lookup: {
                                from: 'jobs',
                                localField: 'jobId',
                                foreignField: '_id',
                                as: 'job'
                            }
                        },
                        {
                            $lookup: {
                                from: 'companies',
                                localField: 'companyId',
                                foreignField: '_id',
                                as: 'company'
                            }
                        },
                        { $unwind: "$job" },
                        { $unwind: "$company" },
                        {
                            $match: {
                                $or: [
                                    { "company.name": { $regex: search, $options: "i" } },
                                    { "job.jobTitle": { $regex: search, $options: "i" } },
                                    { "hiringStatus": { $regex: search, $options: "i" } }
                                ]
                            }
                        },
                        {
                            $count: "count"
                        }
                    ]
                }
            }
        ]);
        if (result && result.length > 0) {
            const applications = result[0].applications;
            const totalCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;
            return { applications, totalCount };
        } else {
            return null;
        }
    } catch (error: any) {
        throw new Error(error?.message);
    }
} 