import { ChatEntity } from "domain/entities/chatEntity";
import mongoose, { Schema, } from "mongoose";


const chatSchema: Schema<ChatEntity> = new Schema(
  {
    roomCreator: {
      type: Schema.Types.ObjectId,
    },
    roomJoiner:
    {
      type: Schema.Types.ObjectId,
    },
    lastMessage: {
      type: Schema.Types.Mixed,
    },

  },
  { timestamps: true }
);

export const Chat = mongoose.model<ChatEntity>("Chat", chatSchema);

