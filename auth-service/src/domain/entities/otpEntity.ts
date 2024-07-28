import { Document, ObjectId } from "mongoose";

export interface OtpEntity extends Document {
  _id?: ObjectId;
  email?: string;
  otp?: string;
  createdAt?: Date;
}
