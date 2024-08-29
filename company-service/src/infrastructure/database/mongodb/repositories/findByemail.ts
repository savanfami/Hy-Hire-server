import { CompanyEntity } from "domain/entities";
import { companyModel } from "../model/companyModel";


export const findByEmail = async (email: string): Promise<CompanyEntity> => {
    try {


        const getCompany = await companyModel.findOne({ email }).select('-password')
        console.log(getCompany, 'company data')

        if (!getCompany) {
            throw new Error('No company found with the provided email');
        }
        return getCompany

    } catch (error) {
        console.log(error)
        throw error
    }



}