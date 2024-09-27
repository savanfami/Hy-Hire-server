import { UserEntity } from "domain/entity";
import { userModel } from "../model/userModel";


export const getUserData = async (email: string): Promise<UserEntity | null> => {
    try {

        const data = await userModel.findOne({ email })
        if (data) {
            return data as unknown as UserEntity
        } else {
             throw new Error('no user found ')
        }
    } catch (error: any) {
        throw new Error(`Failed to update profile: ${error.message}`);

    }
}