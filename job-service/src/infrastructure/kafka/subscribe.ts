import companyProfileUpdatedConsumer from "./consumer/companyProfileUpdatedConsumer"
import { CompanyEntity } from "domain/entities/companyEntity"
import companySocialLinksUpdatedProducer from "./consumer/companySocialLinksUpdatedProducer"
interface ICompanyEvents{
    company_profile_data(data:CompanyEntity):Promise<void>
    company_socialLink_data(data:CompanyEntity):Promise<void>

}

export interface ICompanyProfileUpdatedConsumer extends Pick<ICompanyEvents,'company_profile_data'|'company_socialLink_data'>{}

export const createSubscriber=():ICompanyProfileUpdatedConsumer=>{
    return {
        company_profile_data:companyProfileUpdatedConsumer,
        company_socialLink_data:companySocialLinksUpdatedProducer
    }
}



