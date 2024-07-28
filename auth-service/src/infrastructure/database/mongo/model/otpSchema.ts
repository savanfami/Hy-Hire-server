import { model, Schema } from "mongoose";
import { OtpEntity } from "domain/entities/";

const otpSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: "5m",
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export interface IOtpInterface extends OtpEntity {
  createdAt: Date;
  updatedAt: Date;
}

export const otpmodel = model<OtpEntity>("otp", otpSchema);
