import { UserEntity } from "domain/entities"
import { usermodel } from "../model/userSchema";



export const userLogin=async (email:string,password:string):Promise<UserEntity|null>=>{
    try{

        const user=await usermodel.findOne({email})
        if(user?.isBlocked){
            throw new Error ('user has been blocked')
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