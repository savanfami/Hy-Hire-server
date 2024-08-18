import { producer } from "../index";

export default async (data:{email:string,token:string})=>{
    try{

        await producer.connect()
        const message=[{
            topic:'notification-service-topic',
            messages:[{
                key:'forgot_password',
                value:JSON.stringify(data)
            }]
        }]
        console.log('producer sendign ')
        await producer.sendBatch({topicMessages:message})
        console.log('producer sended',message)

    }catch(error){
        console.log('kafka producer error',error)
        throw error 
    }finally{
        await producer.disconnect()
    }
}