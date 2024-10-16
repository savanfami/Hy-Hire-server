// models/chatMessageSchema.ts
import mongoose, { Schema, Model } from "mongoose";
import { ChatMessageEntity } from "domain/entities/chatMessageEntity";
const chatMessageSchema: Schema<ChatMessageEntity> = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String, 
    },
    attachments: {
      type: [
        {
          url: { type: String },
          localPath: { type: String }, 
        },
      ],
      default: [],
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

export const ChatMessage: Model<ChatMessageEntity> = mongoose.model<ChatMessageEntity>(
  "ChatMessage",
  chatMessageSchema
);