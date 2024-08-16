import companyCreatedConsumer from "./consumer/companyCreatedConsumer"


interface ICompanyEvents{
    company_created(data:IData):Promise<void>
}

export interface IUserCreatedSubscriber extends Pick<ICompanyEvents,'company_created'>{}

export const createSubscriber=():IUserCreatedSubscriber=>{
    return {
        company_created:companyCreatedConsumer
    }
}


export interface IData{
    _id?:string;
    name:string;
    email:string;
    password:string;
    isBlocked:boolean;
    role:string
}