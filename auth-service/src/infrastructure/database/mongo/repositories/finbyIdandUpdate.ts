import { UserEntity } from "domain/entities";
import { usermodel } from "../model/userSchema";

export const findByIdandUpdate = async (id: string): Promise< UserEntity> => {
    try {
        const user=await usermodel.findById(id)
        const updatedStatus=user?.isBlocked
        if(!user){
            throw new Error ('user does not exist')
        }
        user.isBlocked= !updatedStatus;
        await user.save()
        return user
    } catch (error: any) {
        throw new Error(error.message)
    }
}
