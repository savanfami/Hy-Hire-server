import { forgotPasswordConsumer } from "./consumer";
import userCreatedconsumer from "./consumer/userCreatedconsumer";


interface IUserEvents{
    otp_created(data:IData):Promise<void>;
    forgot_password(data:IForgetData):Promise<void>
}


export interface INotificationSubscriber extends Pick<IUserEvents,'otp_created'|'forgot_password'>{}

export const createSubscriber=():INotificationSubscriber=>{
    return {
        otp_created:userCreatedconsumer,
        forgot_password:forgotPasswordConsumer

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