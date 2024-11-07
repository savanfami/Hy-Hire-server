import { IUpdateRescheduleData } from "utils/types/types"
import { applicantModel } from "../model/applicantModel"

export const updateReschedule = async (data: IUpdateRescheduleData): Promise<boolean> => {
    try {
        if (data.status === 'approved') {
            const result = await applicantModel.findByIdAndUpdate(
                data.id,
                {
                    $set: {
                        'schedule.interviewDate': data.newDate,
                        'schedule.interviewTime': data.newTime,
                        'reschedule.status': data.status
                    }
                },
                { new: true }
            );


            if (!result) {
                return false;
            }
            return true;
        } else if (data.status === 'rejected') {
            const result = await applicantModel.findByIdAndUpdate(
                data.id,
                {
                    $set: {
                        'reschedule.status': data.status
                    }
                },
                { new: true }
            );
            if (!result) {
                return false;
            }
            return true;
        }
        return false;
    } catch (error: any) {
        throw new Error(error?.message)
    }
}
