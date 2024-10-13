import { CompanyEntity } from "domain/entities";
import { companyModel } from "../model/companyModel";


export const findByCategory = async (categoryname: string): Promise<CompanyEntity[]> => {
    try {
        const getCompany = await companyModel.find({sector:categoryname}).select('-password')
        if (!getCompany) {
            throw new Error('No company found ');
        }
        return getCompany

    } catch (error) {
        throw error
    }



}