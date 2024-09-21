import { forgotPasswordConsumer } from "./consumer";
import userCreatedconsumer from "./consumer/userCreatedconsumer";
import companyVerificationConsumer from "./consumer/companyVerificationConsumer";


interface IUserEvents{
    otp_created(data:IData):Promise<void>;
    forgot_password(data:IForgetData):Promise<void>
    company_verification(data:IVerificationData):Promise<void>
}


export interface INotificationSubscriber extends Pick<IUserEvents,'otp_created'|'forgot_password'|'company_verification'>{}

export const createSubscriber=():INotificationSubscriber=>{
    return {
        otp_created:userCreatedconsumer,
        forgot_password:forgotPasswordConsumer,
        company_verification:companyVerificationConsumer

    }
}

export interface IData{
    email:string;
    otp:string;
    name:string
}

export interface IForgetData{
    email:string;
    token:string
}

export interface IVerificationData{
    email:string;
    status:ApprovalStatus;
    name:string;
}


export interface ApprovalStatus {
    type: string,
    enum: ['Accepted', 'Rejected', 'Pending', 'Message']
}