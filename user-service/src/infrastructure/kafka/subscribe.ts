import userCreatedConsumer from "./consumer/userCreatedConsumer"


interface IUserEvents{
    user_created(data:IData):Promise<void>
}

export interface IUserCreatedSubscriber extends Pick<IUserEvents,'user_created'>{}

export const createSubscriber=():IUserCreatedSubscriber=>{
    return {
        user_created:userCreatedConsumer
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