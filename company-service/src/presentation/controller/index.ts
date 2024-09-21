import { IDependencies } from "application/interfaces/IDependencies";
import { updateProfileController } from "./updateProfileController";
import { getCompanyController } from "./getCompany";
import { updateSocialLinksController } from "./updateSocialLinks";
import { companyRequestController } from "./companyRequest";
import { listRequestController } from "./companyListController";
import { updateRequestController } from "./updateRequestController";

export const controller=(dependencies:IDependencies)=>{
    return {
        updateProfile:updateProfileController(dependencies),
        getCompany:getCompanyController(dependencies),
        updateSocialLinks:updateSocialLinksController(dependencies),
        sendRequest:companyRequestController(dependencies),
        listRequest:listRequestController(dependencies),
        updateRequest:updateRequestController(dependencies)
    }
}