import { generateVerificationMail } from '../../mail/generateVerificationMail'
import { IData } from '../subscribe'




export default async(
    data:IData
    
)=>{
    try{

        console.log('consumer working mail sending on process')
        console.log(data,'dattaaaaaa froma auth')
        // const parsedData:IUserCreatedData=JSON.parse(data)
        const email=data.email
        const otp=data.otp 
        const username=data.username
        if (!email ||!otp ) {
            throw new Error('Missing email or OTP in the data');
          }
          await generateVerificationMail(email,otp,username);
    }catch(error){
        console.log(error)
    }
}