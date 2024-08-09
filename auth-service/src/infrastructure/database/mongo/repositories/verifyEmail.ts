import { usermodel } from "../model/userSchema";

export const checkEmail=async (email:string):Promise<boolean>=>{
    try{
        const userExist=await usermodel.findOne({email})
            return userExist?true:false
        }catch(error:any){
            console.log(error,'erorr from verify email database')
            throw new Error(error?.message)
        }
    }

