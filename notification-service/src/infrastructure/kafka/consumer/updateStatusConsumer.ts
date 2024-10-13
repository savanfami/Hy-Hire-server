// import sendForgotPasswordMail from "../../services/mail/sendForgotPasswordMail"
import { generateApplicatonShortlistedMail } from "../../../utils/mailGenerator/generateUpdatedHiringStatusMail"
import { IUpdateStatusData } from "utils/mailGenerator/Types"
// import { generateCompanyVerificationMail } from "../../../utils/mailGenerator/generateCompanyVerificationMail"

export default async (data:IUpdateStatusData):Promise<void>=>{
    try{
 
      await generateApplicatonShortlistedMail(data)
    }catch(error){
        console.log(error)
    }
}