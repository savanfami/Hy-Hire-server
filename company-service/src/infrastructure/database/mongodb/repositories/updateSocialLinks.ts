import { CompanyEntity } from "domain/entities/companyEntity";
import { companyModel, SocialLinks } from "../model/companyModel";

export const updateSocialLinks = async (data: SocialLinks, email: string): Promise<CompanyEntity | null> => {
    try {
        if (data && email) {
            const company = await companyModel.findOneAndUpdate(
                { email },
                { $set: data },
                { new: true, runValidators: true }
            );
            return company as CompanyEntity;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

    return null;
};
