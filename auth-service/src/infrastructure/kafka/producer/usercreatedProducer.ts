import { UserEntity } from "domain/entities";
import { producer } from "../index";

export default async (data:UserEntity)=>{
    try{

        console.log('kafka data producer runninig',data)
        const message=[{
            topic:'notification-service-topic',
            messages:[{
                key:'user-created',
                value:JSON.stringify(data)
            }]
        }]
        console.log('data message is creatd')
        await producer.sendBatch({topicMessages:message})
        console.log('producer sended',message)

    }catch(error){
        console.log('kafka producer error')
        throw error 
    }finally{
        await producer.disconnect()
    }
}