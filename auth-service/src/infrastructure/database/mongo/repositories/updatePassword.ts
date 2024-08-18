import { usermodel } from "../model/userSchema";
export const updatePassword=async(
    email:string,
    password:string
)=>{
    try{

 const updatePassword=await usermodel.findOneAndUpdate({email},{$set:{password}})
return updatePassword
    }catch(error:any){
        throw new Error(error)
    }
    
}