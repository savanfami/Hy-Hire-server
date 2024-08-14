import { UserEntity } from "domain/entities";
import { usermodel } from "../model/userSchema";
import { generateOtp } from "../../../../utils/common/generateOtp";
import { storeOtp } from "../../redis/saveOtp";
// import { CustomError } from "utils/common/customError";

export const signup = async (data: UserEntity): Promise<UserEntity | null> => {
  try {
    const { email, password, name, role } = data;
    let existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      // throw new CustomError();
      throw Error("email already exists");
    }

    const otp = generateOtp();
    const res = {
      email,
      name,
      otp,
      role,
      password,
    };

    const saveOtp = await storeOtp(res.email, res.otp);
    if (res && saveOtp) {
      return res as UserEntity;
    } else {
      throw new Error("signup failed");
    }
  } catch (error) {
    throw error;
  }
};
