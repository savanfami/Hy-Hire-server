import mongoose  from "mongoose"
import { applicantModel } from "../model/applicantModel"
import { userModel } from "../model/userMode"
import { HttpStatusCode } from "axios"
import { ErrorResponse } from "../../../../utils/common/ErrorResponse"



export const applyJob = async (userId: string, companyId: string, resume: string,jobId: string): Promise<boolean| null> => {
    try {
        if (userId) {
            let userObjectId= new mongoose.Types.ObjectId(userId)
            let user = await userModel.findById({_id:userObjectId })
            console.log(user)
            if (!user) {
                return false
            }
            let isApplied = await applicantModel.findOne({ companyId, jobId, userId })
            if (isApplied) {
                throw new ErrorResponse(HttpStatusCode.Conflict,'Already applied')
            }
            let applicant = await applicantModel.create({
                companyId,
                userId,
                jobId,
                resume,
            }) 
            // console.log(applicant)
            if (applicant) {
                return true
            } else {
                return false
            }
        }else{
            return false
        }
    } catch (error) {
        throw error
    }
}