import { ICreateMessagePayload } from "utils/types/types";
import { ChatMessage } from "../../model/chatMessageSchema";



export const createMessage=async(data:ICreateMessagePayload):Promise<boolean|null>=>{
    try {
        

        const createMessage=await ChatMessage.create({
          senderId:data.senderId,
          content:data.message,
          chatId:data.chatId
        })
        await createMessage.save()

        if(createMessage){
            console.log('message createedd')
            return true
        }else{
            throw new Error('failed to create message')
        }
    } catch (error) {
        console.log('errorro=>>>>>>>>>>>>>>>>>>>>>>>>>>',error)
        throw error
    }
}