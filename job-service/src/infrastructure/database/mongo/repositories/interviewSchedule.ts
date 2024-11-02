import mongoose from "mongoose";
import { applicantModel } from "../model/applicantModel";
import { IgetInterviewStatus } from "utils/types/types";

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
                    'schedule.interviewDate': 1,
                    'schedule.interviewTime': 1,
                    'schedule.status': 1,
                    'schedule.roomId': 1, 
                }
            }
        ]);
    
        return interviewStatusData.length ? interviewStatusData[0] : null; 
    } catch (error: any) {
        throw new Error(`Error fetching interview status: ${error.message}`);
    }
}
