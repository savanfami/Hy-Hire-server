// import sendForgotPasswordMail from "../../services/mail/sendForgotPasswordMail"
import { IUpdateRequestResponse } from "utils/mailGenerator/Types"
import { generateCompanyVerificationMail } from "../../../utils/mailGenerator/generateCompanyVerificationMail"

export default async (data:IUpdateRequestResponse):Promise<void>=>{
    try{
 
    await generateCompanyVerificationMail(data)

    }catch(error){
        console.log(error)
    }
}