import userCreatedconsumer from "./consumer/userCreatedconsumer";


interface IUserEvents{
    otp_created(data:IData):Promise<void>;
}


export interface INotificationSubscriber extends Pick<IUserEvents,'otp_created'>{}

export const createSubscriber=():INotificationSubscriber=>{
    return {
        otp_created:userCreatedconsumer
    }
}

export interface IData{
    email:string;
    otp:string;
    username:string
}