import sendForgotPasswordMail from "../../services/mail/sendForgotPasswordMail"
import { IForgetData } from "../subscribe"

export default async (data:IForgetData):Promise<void>=>{
    try{
  const {email,token}=data
    await sendForgotPasswordMail(email,token)

    }catch(error){
        console.log(error)
    }
}