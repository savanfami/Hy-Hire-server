import {consumer} from '../index'
import { createSubscriber,INotificationSubscriber } from '../subscribe'



export const startConsumer=async()=>{
    try{

        await consumer.connect()
        console.log('consumer connected')
        await consumer.subscribe({
            topic:'notification-service-topic',
            fromBeginning:true
        })
        console.log('consumer subscribed')
        const subscriber=createSubscriber()

  await consumer.run({
    eachMessage: async ({message }) => {
        console.log(message,'message recieved in consumer')
        const {key,value}=message
        console.log(String(key),'key',String(value),'value')
        const subscirberMethod=String(key) as keyof INotificationSubscriber
        console.log(subscirberMethod,'subscribed method')
        const subcriberData=JSON.parse(String(value))
        try{

        if(subscirberMethod in subscriber){
            await subscriber[subscirberMethod](subcriberData)
        }else{
            throw new Error (`method ${subscirberMethod} not found in subscriber`)
        }
        }catch(error:any){
            console.error('error calling method',error)
        }
    }
})
    }catch(error){
        console.error(error)
    }
}


export const stopConsumer = async () => {
    try {
        await consumer.stop();
        await consumer.disconnect();
        console.log('Consumer stopped and disconnected');
    } catch (error: any) {
        console.error("Error stopping Kafka consumer:", error.message);
    }
};