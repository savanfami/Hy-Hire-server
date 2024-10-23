// models/chatMessageSchema.ts
import mongoose, { Schema, Model } from "mongoose";
import { ChatMessageEntity } from "domain/entities/chatMessageEntity";
const chatMessageSchema: Schema<ChatMessageEntity> = new Schema(
  {
    content: {
      type: String,
    },
    senderId: {
      type: Schema.Types.ObjectId,
    },
    attachments: {
      type: [
        {
          url: { type: String },
          type: { type: String },
        },
      ],
      default: [],
    },
    chatId: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export const ChatMessage: Model<ChatMessageEntity> = mongoose.model<ChatMessageEntity>(
  "ChatMessage",
  chatMessageSchema
);