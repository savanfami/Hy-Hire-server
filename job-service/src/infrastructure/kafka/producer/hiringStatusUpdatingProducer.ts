import { IUpdateStatusResponse } from "utils/types/types";
import { producer } from "../index";

export default async (data:IUpdateStatusResponse)=>{
    try{

        console.log('kafka data producer runninig',data)
        await producer.connect()
        const message=[{
            topic:'notification-service-topic',
            messages:[{
                key:'status_updated',
                value:JSON.stringify(data)
            }]
        }]
        console.log('data message is creatd')
        await producer.sendBatch({topicMessages:message})
        console.log('producer sended',message)

    }catch(error){
        console.log('kafka producer error',error)
        throw error 
    }finally{
        await producer.disconnect()
    }
}