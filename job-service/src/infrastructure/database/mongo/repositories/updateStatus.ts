import { IUpdateStatusPayload } from "utils/types/types";
import { applicantModel } from "../model/applicantModel";
import mongoose from "mongoose";



export const updateStatus = async (payload: IUpdateStatusPayload): Promise<any | null> => {
    try {
        const applicant = await applicantModel.findById(payload.applicationId)
        if (!applicant) {
            throw new Error('applicant not found')
        }
        const updateData: {
            hiringStatus: string; interviewDate?: Date; interviewTime?: string, schedule?: {
                interviewDate: Date;
                interviewTime: string;
                status: string;
                roomId: string;
                feedback: string
            }
        } = {
            hiringStatus: payload.hiringStatus,
        };
        if (payload.hiringStatus === 'shortlisted' && payload.interviewDate && payload.interviewTime) {
            updateData.schedule = {
                interviewDate: payload.interviewDate,
                interviewTime: payload.interviewTime,
                status: 'pending',
                roomId: '',
                feedback: ''
            };
        } else if (payload.hiringStatus === 'interview') {

            // updateData.schedule = {
            //     ...applicant.schedule, 
            //     status: 'confirmed', 
            //     roomId: payload.roomId
            // };
        }
        const updateStatus = await applicantModel.findByIdAndUpdate(
            payload.applicationId,
            {
                $set: updateData
            },
            { new: true }
        )

        if (updateStatus && updateStatus.hiringStatus === 'shortlisted') {
            const ObjectId = new mongoose.Types.ObjectId(payload.applicationId)
            const result = await applicantModel.aggregate([
                {
                    $match: { _id: ObjectId }
                },

                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
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
                    $lookup: {
                        from: 'jobs',
                        localField: 'jobId',
                        foreignField: '_id',
                        as: 'jobDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$userDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$companyDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$jobDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        hiringStatus: 1,
                        'schedule.interviewDate': 1,
                        'schedule.interviewTime': 1,
                        'userDetails.name': 1,
                        'userDetails.email': 1,
                        'companyDetails.name': 1,
                        'jobDetails.jobTitle': 1
                    }
                }
            ]);
            return result[0]
        } else {
            return updateStatus
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}