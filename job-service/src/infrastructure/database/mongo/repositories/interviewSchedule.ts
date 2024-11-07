import mongoose from "mongoose";
import { applicantModel } from "../model/applicantModel";
import { IgetInterviewStatus, IgetUserInteviewSchedules } from "utils/types/types";

export const interviewSchedule = async (id: string): Promise<IgetInterviewStatus | null> => {
    const applicationId = new mongoose.Types.ObjectId(id);
    try {
        const interviewStatusData = await applicantModel.aggregate([
            {
                $match: {
                    _id: applicationId
                }
            },
            {
                $project: {
                    '_id':1,
                    'schedule.interviewDate': 1,
                    'schedule.interviewTime': 1,
                    'schedule.status': 1,
                    'schedule.roomId': 1,
                    'reschedule.reason':1,
                    'reschedule.status':1
                }
            }
        ]);

        return interviewStatusData.length ? interviewStatusData[0] : null;
    } catch (error: any) {
        throw new Error(`Error fetching interview status: ${error.message}`);
    }
}


export const getUserinterviewSchedules = async (id: string): Promise<IgetUserInteviewSchedules[] | null> => {
    try {

        const userId = new mongoose.Types.ObjectId(id);
        const getData = await applicantModel.aggregate([
            {
                $match: {
                    userId: userId,
                    hiringStatus: 'shortlisted'
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
                    preserveNullAndEmptyArrays: true 
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
                    path: '$jobDetails', 
                    preserveNullAndEmptyArrays: true 
                } 
            },
            {
                $project: {
                    'companyDetails.name': 1,  
                    'jobDetails.jobTitle': 1,      
                    'schedule.interviewDate': 1,
                    'schedule.interviewTime': 1,
                    'reschedule.status':1
                }
            }
        ]);
         if(getData){
            return getData
         }else{
            return null
         }
    } catch (error: any) {
        throw new Error(`Error fetching interview status: ${error.message}`);
    }
}  