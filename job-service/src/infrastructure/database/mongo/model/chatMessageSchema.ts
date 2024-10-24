import mongoose, { Schema, Model } from "mongoose";
import { ChatMessageEntity } from "domain/entities/chatMessageEntity";


const chatMessageSchema: Schema<ChatMessageEntity> = new Schema(
  {
    message: {
      type: String,
    },
    senderId: {
      type: Schema.Types.ObjectId,
     
    },
    audio: { type: String },
    isAudio: { type: Boolean, default: false },
    chatId: {
      type: Schema.Types.ObjectId,
     
    },
    isRead:{
      type:Boolean
    }
  },
  { timestamps: true }
);

export const ChatMessage: Model<ChatMessageEntity> = mongoose.model<ChatMessageEntity>(
  "ChatMessage",
  chatMessageSchema
);
