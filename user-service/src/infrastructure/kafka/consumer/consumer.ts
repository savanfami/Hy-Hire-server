import {consumer} from '../index'
import { createSubscriber,IUserCreatedSubscriber } from '../subscribe'



export const startConsumer=async()=>{
    try{

        await consumer.connect()
        await consumer.subscribe({
            topic:'user-service-topic',
            fromBeginning:true
        })
        const subscriber=createSubscriber()

  await consumer.run({
    eachMessage: async ({message }) => {
        const {key,value}=message
        console.log(String(key),'key',String(value),'value')
        const subscirberMethod=String(key) as keyof IUserCreatedSubscriber
        // console.log(subscirberMethod,'subscribed method from user service=>>>>>')
        const subcriberData=JSON.parse(String(value))
        try{

        if(subscirberMethod in subscriber){
            await subscriber[subscirberMethod](subcriberData)
            console.log('subscribe completed in user service')
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