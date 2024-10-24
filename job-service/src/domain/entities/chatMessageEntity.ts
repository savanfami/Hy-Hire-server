import  {  Document, Types } from "mongoose";

export interface IAttachment {
  url: string;
  type: string;
}

export interface ChatMessageEntity extends Document {
  senderId: Types.ObjectId ; 
  message: string;
  audio: string ; 
  chatId: Types.ObjectId; 
  isAudio:boolean
  createdAt: Date; 
  updatedAt: Date;
  isRead?:boolean
  _id:Types.ObjectId
}