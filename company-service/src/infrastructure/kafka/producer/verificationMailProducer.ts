// import { UserEntity } from "domain/entities";
import { ApprovalStatus } from "utils/types/allTypes";
import { producer } from "../index";

export default async (data:{email:string,status:ApprovalStatus})=>{
    try{
        console.log('kafka company verification producer runninig',data)
        await producer.connect()
        const message=[{
            topic:'notification-service-topic',
            messages:[{
                key:'company_verification',
                value:JSON.stringify(data) 
            }]
        }]
        console.log('data message is created')
        await producer.sendBatch({topicMessages:message})
        console.log('producer sended',message)
    }catch(error){
        console.log('kafka producer error',error)
        throw error 
    }finally{
        await producer.disconnect()
    }
}