// import { approvalModel } from "../model/Approval";
import { ApprovalStatus } from "utils/types/allTypes";
import { companyModel } from "../model/companyModel";

export const updateRequest = async (id: string, status: string): Promise<{email:string,status:ApprovalStatus,name:string}|null> => {
    try {
          
        const updatedCompany = await companyModel.findByIdAndUpdate({ _id: id },
            
             { $set: { approvalStatus: status } },
             {new:true})
         if(updatedCompany){
            const email=updatedCompany?.email
            const status=updatedCompany?.approvalStatus  as ApprovalStatus
            const name=updatedCompany?.name
            return {email,status,name}
         }else{
             throw new Error('error while updating')
         }
    } catch (error: any) {
        throw new Error(`Failed to update company approval status: ${error.message}`);
    }
}