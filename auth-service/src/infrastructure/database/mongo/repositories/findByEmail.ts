import { UserEntity } from "domain/entities";
import { usermodel } from "../model/userSchema";

export const findByEmail = async (email: string):Promise<UserEntity|null> => {
  try {
    const existingUser = await usermodel.findOne({ email })
    return existingUser
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
