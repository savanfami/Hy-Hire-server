import { usermodel } from "../model/userSchema";
import { UserEntity } from "domain/entities";

export const checkEmail=async (email:string):Promise<UserEntity|null>=>{
    try{
        const userExist=await usermodel.findOne({email})
        if(!userExist){
            throw new Error('Login failed: The email address you entered is not registered. Please sign up ');

        }
        if(userExist?.isBlocked){
            throw new Error("Access denied: Your account has been blocked by the Hy-Hire. Please contact support for assistance.");
        }
            return userExist
        }catch(error:any){
            throw new Error(error?.message)
        }
    }

