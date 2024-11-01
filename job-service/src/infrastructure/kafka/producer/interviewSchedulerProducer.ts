import { IUpdateStatusResponse } from "utils/types/types";
import { producer } from "../index";

export default async (data:IUpdateStatusResponse)=>{
    try{

        await producer.connect()
        const message=[{
            topic:'notification-service-topic',
            messages:[{
                key:'interview_scheduler',
                value:JSON.stringify(data)
            }]
        }]
        await producer.sendBatch({topicMessages:message})

    }catch(error){
        console.log('kafka producer error',error)
        throw error 
    }finally{
        await producer.disconnect()
    }
}