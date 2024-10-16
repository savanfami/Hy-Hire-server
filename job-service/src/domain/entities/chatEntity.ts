import  {  Document, Schema } from "mongoose";


export interface ChatEntity extends Document {
  roomCreator: Schema.Types.ObjectId;
  roomJoiner: Schema.Types.ObjectId;
  lastMessage?:string
  createdAt?: Date;
  updatedAt?: Date;
}
  