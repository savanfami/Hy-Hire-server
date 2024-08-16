import { userModel } from "../model/userModel";
import { UserEntity } from "domain/entity";


export const getAllUser=async():Promise<UserEntity[]|null>=>{
    try{
         const getUser=await userModel.find().select('-password')
         if(getUser.length > 0) {
            return getUser as unknown as UserEntity[]
        } else {
            throw new Error('no users found')
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}