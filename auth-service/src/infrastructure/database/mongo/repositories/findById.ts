import { usermodel } from "../model/userSchema";
import { UserEntity } from "domain/entities"

export const findUserById = async (id: string): Promise<UserEntity | null> => {
    try {
        const findUser = await usermodel.findById(id)
        console.log(findUser,'user finded')
        if (!findUser) {
            throw new Error("user does not exist")
        }
        return findUser
    } catch (error: any) {
        throw new Error(error.message)
    }
}