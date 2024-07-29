import userCreatedconsumer from "./consumer/userCreatedconsumer";


interface IUserEvents{
    user_created(data:string):Promise<void>;
}


export interface INotificationSubscriber extends Pick<IUserEvents,'user_created'>{}

export const createSubscriber=():INotificationSubscriber=>{
    return {
        user_created:userCreatedconsumer
    }
}