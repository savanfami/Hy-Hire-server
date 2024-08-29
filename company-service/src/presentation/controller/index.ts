import { IDependencies } from "application/interfaces/IDependencies";
import { updateProfileController } from "./updateProfileController";
import { getCompanyController } from "./getCompany";
import { updateSocialLinksController } from "./updateSocialLinks";
import { companyRequestController } from "./companyRequest";

export const controller=(dependencies:IDependencies)=>{
    return {
        updateProfile:updateProfileController(dependencies),
        getCompany:getCompanyController(dependencies),
        updateSocialLinks:updateSocialLinksController(dependencies),
        sendRequest:companyRequestController(dependencies)
    }
}