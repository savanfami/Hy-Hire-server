import { UserEntity } from "domain/entities";
import { usermodel } from "../model/userSchema";


export const createUser=async (data:UserEntity):Promise<UserEntity|null>=>{
    try{

  const newUser=await usermodel.create(data)
   if(!newUser){
    throw new Error('user creation failed')
   }
   return newUser

    }catch(error:any){
        return error?.message
    }
}