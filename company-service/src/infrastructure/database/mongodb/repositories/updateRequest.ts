// import { approvalModel } from "../model/Approval";
import { Approvalstatus, IUpdateRequestPayload, IUpdateRequestResponse } from "../../../../utils/types/allTypes";
import { companyModel } from "../model/companyModel";

export const updateRequest = async (id: string, updatePayload: IUpdateRequestPayload): Promise<IUpdateRequestResponse | null> => {
    try {
        let updatedCompany: any
        if (updatePayload.status === Approvalstatus.REJECTED && updatePayload.reason) {
            updatedCompany = await companyModel.findByIdAndUpdate({ _id: id },
                { $set: { approvalStatus: updatePayload.status, rejectionReason: updatePayload.reason } },
                { new: true }
            )
        } else if (updatePayload.status === Approvalstatus.APPROVED) {
            updatedCompany = await companyModel.findByIdAndUpdate(
                { _id: id },
                { $set: { approvalStatus: updatePayload.status } },
                { new: true }
            )
        }
        if (updatedCompany.approvalStatus === 'Rejected') {
            const email = updatedCompany?.email;
            const status = updatedCompany?.approvalStatus;
            const name = updatedCompany?.name;
            const reason = updatedCompany?.rejectionReason
            return { email, status, name, reason }
        } else if (updatedCompany.approvalStatus === 'Approved') {
            const email = updatedCompany?.email;
            const status = updatedCompany?.approvalStatus;
            const name = updatedCompany?.name;
            return { email, status, name }
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(`Failed to update company approval status: ${error.message}`);
    }
}