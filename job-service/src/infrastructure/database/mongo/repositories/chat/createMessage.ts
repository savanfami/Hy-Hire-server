import { ICreateMessagePayload, IMessageResponse } from "utils/types/types";
import { ChatMessage } from "../../model/chatMessageSchema";
import { Chat } from "../../model/chatSchema";

export const createMessage = async (data: ICreateMessagePayload): Promise<IMessageResponse | null> => {
    try {
        const isAudio = !!data.audio; 
        const createMessage = await ChatMessage.create({
            senderId: data.senderId,
            message: data.message || '', 
            audio: data.audio || '', 
            isAudio, 
            chatId: data.chatId,
        })
        await Chat.findByIdAndUpdate(data.chatId, {
            lastMessage: data.message || '', 
        });
        if (createMessage) {
            return createMessage;
        } else {
            throw new Error('failed to create message');
        }
    } catch (error) {
        throw error; 
    }
};
