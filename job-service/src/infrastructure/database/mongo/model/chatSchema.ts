import { ChatEntity } from "domain/entities/chatEntity";
import mongoose, { Schema, } from "mongoose";


const chatSchema: Schema<ChatEntity> = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
    },
    recieverId:
    {
      type: Schema.Types.ObjectId,
    },
    lastMessage: {
      type: Schema.Types.Mixed,
    },
    unreadCount:{
      type:Number
    },
    messageSender:{
      type:Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);

export const Chat = mongoose.model<ChatEntity>("Chat", chatSchema);

