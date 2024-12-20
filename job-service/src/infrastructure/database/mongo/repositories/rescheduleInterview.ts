import { IRescheduleInterviewPayload } from "utils/types/types";
import { applicantModel } from "../model/applicantModel";

export const rescheduleInterview = async (data: IRescheduleInterviewPayload): Promise<boolean | null> => {
    try {
        const rescheduleInterview = await applicantModel.findByIdAndUpdate(data.interviewId, {
            $set: {
                'reschedule.reason': data.reason,
                'reschedule.status':'requested'
            }
        })
        if (rescheduleInterview) {
            return true
        } else {
            return false
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}