import { jobModel } from "../model/jobModel"



export const deleteJobs = async (jobId: string): Promise<boolean | null> => {
    try {
        const data = await jobModel.findByIdAndDelete({_id:jobId })
        if (data) {
            return true
        } else {
            return false
        }
    } catch (error:any) {
        throw new Error("An unexpected error occurred.");
    }
}