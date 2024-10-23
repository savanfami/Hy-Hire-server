import  {  Document, Schema } from "mongoose";


export interface ChatEntity extends Document {
  senderId: Schema.Types.ObjectId;
  recieverId: Schema.Types.ObjectId;
  lastMessage?:string
  createdAt?: Date;
  updatedAt?: Date;
  unreadCount:number;
}
  