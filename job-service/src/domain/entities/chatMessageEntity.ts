import mongoose, {  Document } from "mongoose";

export interface IAttachment {
  url: string;
  type: string;
}

export interface ChatMessageEntity extends Document {
  senderId: mongoose.Types.ObjectId | undefined; 
  content: string;
  attachments: IAttachment[] | null; 
  chatId: mongoose.Types.ObjectId; 
  createdAt: Date; 
  updatedAt: Date;
}