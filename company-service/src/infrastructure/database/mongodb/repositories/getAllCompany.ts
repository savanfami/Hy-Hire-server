import { CompanyEntity } from "domain/entities";
import { companyModel } from "../model/companyModel";
import { MongooseError } from "mongoose";
import { ICompanySearchParams, IPaginatedCompaniesResponse } from "utils/types/allTypes";

export const getAllCompany = async (data:ICompanySearchParams): Promise<IPaginatedCompaniesResponse | null> => {
    try {
        const { page , name, location, industry } = data;
        const limit=8;
        const skip=(page-1)*limit
        const filter: Record<string, any> = { approvalStatus: 'Approved' };
        if (name) {
            filter.name = { $regex: name, $options: 'i' }; 
        }

        if (location) {
            filter.location = { $regex: location, $options: 'i' }; 
        }

        if (industry) {
            filter.sector = industry; 
        }

        const totalCompanies = await companyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCompanies / limit);
        const companies = await companyModel
        .find(filter)
        .skip(skip)  
        .limit(limit); 
         return {
            totalCompanies,
            totalPages,
            companies: companies as unknown as CompanyEntity[],
         }
       
    } catch (error) {
        if (error instanceof MongooseError) {
            throw new Error(error.message || 'company data fetching failed');
        } else {
            throw new Error('company data fetching failed');
        }
    } 
};
