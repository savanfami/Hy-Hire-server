import { CompanyEntity } from "domain/entities";
import { approvalModel } from "../model/Approval";
import { ICompany } from "../model/companyModel";



export const listRequest = async (): Promise<CompanyEntity | null> => {
    try {

        let requests = await approvalModel.find().populate<{ companyId: ICompany }>({ path: 'companyId', select: '-password' }).select('-_id')
        if (requests) {
            return requests as CompanyEntity
        } else {
            return requests
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }
}