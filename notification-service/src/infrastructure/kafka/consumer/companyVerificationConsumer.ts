// import sendForgotPasswordMail from "../../services/mail/sendForgotPasswordMail"
import { generateCompanyVerificationMail } from "../../../utils/mailGenerator/generateCompanyVerificationMail"
import { IVerificationData } from "../subscribe"

export default async (data:IVerificationData):Promise<void>=>{
    try{
 
    await generateCompanyVerificationMail(data)

    }catch(error){
        console.log(error)
    }
}