import { CompanyEntity } from "domain/entities/companyEntity";
import { companyModel } from "../model/companyModel";


export const updateProfile = async (data: CompanyEntity, email: string) => {
    try {

        if (data) {
            let updateCompany = await companyModel.findOneAndUpdate({
                email,

            },
                {
                    $set:
                        data
                },
                {
                    new: true
                }
            ).select('-password')

            if (updateCompany) {
                return updateCompany as unknown as CompanyEntity
            } else {
                throw new Error('error while updating')
            }


        } else {
            throw new Error('data not found')
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }
}