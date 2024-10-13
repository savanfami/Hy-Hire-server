import { generateVerificationMail } from '../../../utils/mailGenerator/generateVerificationMail'
import { IData } from '../subscribe'




export default async(
    data:IData
    
)=>{
    try{
        const email=data.email
        const otp=data.otp 
        const username=data.name
        if (!email ||!otp ) {
            throw new Error('Missing email or OTP in the data');
          }
          await generateVerificationMail(email,otp,username);
    }catch(error){
        console.log(error)
    }
}