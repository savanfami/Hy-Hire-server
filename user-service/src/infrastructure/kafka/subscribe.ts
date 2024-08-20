import userCreatedConsumer from "./consumer/userCreatedConsumer"
import { userBlockPayload } from "./consumer/userBlockStatusConsumer"
import userBlockStatusConsumer from "./consumer/userBlockStatusConsumer"


interface IUserEvents{
    user_created(data:IData):Promise<void>
    block_unblock(data:userBlockPayload):Promise<void>
}

export interface IUserCreatedSubscriber extends Pick<IUserEvents,'user_created' | 'block_unblock'>{}

export const createSubscriber=():IUserCreatedSubscriber=>{
    return {
        user_created:userCreatedConsumer,
        block_unblock:userBlockStatusConsumer
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