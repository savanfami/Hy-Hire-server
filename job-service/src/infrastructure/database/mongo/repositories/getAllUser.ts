import { UserEntity } from "domain/entities/userEntity";
import { userModel } from "../model/userMode";



export const getAllUser = async (): Promise<UserEntity[] | null> => {
    try {
        const data = await userModel.find()
        if (data) {
            return data as unknown as UserEntity[]
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}
