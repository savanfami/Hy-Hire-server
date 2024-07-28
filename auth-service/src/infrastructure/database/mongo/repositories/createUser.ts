import { UserEntity } from "domain/entities";
import { usermodel } from "../model/userSchema";
import { generateOtp } from "../../../../utils/common/generateOtp";
import { storeOtp } from "../../redis/saveOtp";
// import { otpmodel } from "../model/otpSchema";
// import {createClient} from 'redis'
// import { redisAdapter } from "infrastructure/database/redis/redis";

export const signup = async (
  data: UserEntity
): Promise<UserEntity | null> => {
  try {
    const { email, username, password, confirmPassword } = data;
  
    let existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      throw new Error("user already exists");
    }

    if (password !== confirmPassword) {
      throw new Error("password didnt match");
    } else {
      const otp = generateOtp();
      const res = {
        email,
        password,
        username,
        otp,
      };

      const saveOtp=await storeOtp(res.email,res.otp)
console.log(saveOtp,"save otppppppppppp")

      if (res) {
        return res as UserEntity;
      } else {
        throw new Error("signup failed");
      }
    }
  } catch (error: any) {
    throw new Error(error?.message)
  } 
};
