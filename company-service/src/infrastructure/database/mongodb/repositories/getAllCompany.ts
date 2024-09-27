import { CompanyEntity } from "domain/entities";
import { companyModel } from "../model/companyModel";
import { MongooseError } from "mongoose";

export const getAllCompany = async (): Promise<CompanyEntity[] | null> => {
    try {
        const data = await companyModel.find({approvalStatus:'Approved'});
        if (data) {
            return data as unknown as CompanyEntity[];
        } else {
            return null; 
        }
    } catch (error) {
        if (error instanceof MongooseError) {
            throw new Error(error.message || 'company data fetching failed');
        } else {
            throw new Error('company data fetching failed');
        }
    }
};
