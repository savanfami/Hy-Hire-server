import { UserEntity } from "domain/entities"
import { usermodel } from "../model/userSchema";



export const userLogin=async (email:string,password:string):Promise<UserEntity|null>=>{
    try{

        const user=await usermodel.findOne({email})
        if(user?.isBlocked){
            throw new Error("Access denied: Your account has been blocked by the Hy-Hire. Please contact support for assistance.");
        }
        if (user) {
            
            if (await user?.matchPassword(password)) {
                return user as UserEntity
            } else {
                throw new Error('Incorrect password')
            }
        } else {
            throw new Error('user not found')
        }
    }catch(error:any){
        throw  Error(error.message)
    }
}