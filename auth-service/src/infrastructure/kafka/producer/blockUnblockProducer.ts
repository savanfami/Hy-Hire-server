import { producer } from "../index";

type producerPayload={
    userId:string;
    isBlocked:boolean|undefined
}

export default async (data:producerPayload)=>{
    try{

        console.log('kafka block unblock producer runninig')
        await producer.connect()
        const message=[{
            topic:'user-service-topic',
            messages:[{
                key:'block_unblock',
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