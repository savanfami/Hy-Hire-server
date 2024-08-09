// import { UserEntity } from "domain/entities";
import { UserEntity } from "domain/entities";
import { Client } from "../../redis/redisClient";
import { usermodel } from "../model/userSchema";

export const verifyOtp = async (
  data: UserEntity
): Promise<UserEntity | null> => {
  try {
    const key = `otp:${data.email}`;
    const value = await Client.get(key);
    if (!value) {
      throw new Error("otp has expired");
    }
    if (value !== data.otp) {
      throw new Error("invalid otp");
      
    }

    const user = await usermodel.create({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
    });

   return !user ? null : user as UserEntity;
  } catch (error:any) {
   throw error
  }
};
