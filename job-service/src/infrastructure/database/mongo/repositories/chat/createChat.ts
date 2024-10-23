import { IChatpayload } from "utils/types/types";
import { Chat } from "../../model/chatSchema";

export const createChat = async (data: IChatpayload): Promise<boolean> => {
    try {
        console.log(data);
        let chat = await Chat.findOne({
            senderId: data.senderId,
            recieverId: data.recieverId
        });
        if (!chat) {
            chat = new Chat({
                senderId: data.senderId,
                recieverId: data.recieverId
            });
            await chat.save();
        }
        return true;
    } catch (error) {
        console.error("Error creating chat:", error);
        return false;
    }
}