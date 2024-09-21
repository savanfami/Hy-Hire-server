import { CompanyEntity } from "domain/entities";
import { producer } from "../index";

export default async (data:CompanyEntity)=>{
    try{
        console.log('kafka company socail links updated producer runninig',data)
        await producer.connect()
        const message=[{
            topic:'job-service-topic',
            messages:[{
                key:'company_socialLink_data',
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