import { approvalModel } from "../model/Approval";
import { companyModel } from "../model/companyModel";

export const sendRequest = async (email: string): Promise<boolean | null> => {
    try {

        if (email) {
            const data = await companyModel.findOne({ email })
            if (data?.profileCompleted) {
                const isApproval = await approvalModel.findOne({ companyId: data._id })
                if (isApproval) {
                    throw new Error('verification request already sent')
                }
                const approval = await approvalModel.create({
                    companyId: data._id
                })
                if (approval) {
                    return true
                } else {
                    throw new Error('error while creating approval')
                }
            } else {
                return false
            }
        } else {
            throw new Error('provide email')
        }


    } catch (error: any) {
        throw new Error(error?.message)
    }
}