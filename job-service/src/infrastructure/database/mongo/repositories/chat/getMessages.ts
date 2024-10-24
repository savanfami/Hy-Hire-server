import { ChatMessage } from "../../model/chatMessageSchema";
import { IMessageResponse } from "utils/types/types";


export const getMessages = async (chatId:string): Promise<IMessageResponse[] | null> => {
    try {
        const messages=await ChatMessage.find({chatId})
        if(messages){
            return messages as unknown as IMessageResponse[]
        }else{
            return null
        }
    } catch (error) {
        throw error; 
    }
};
 