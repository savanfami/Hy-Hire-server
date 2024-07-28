// import { otpmodel } from "../model/otpSchema";
// import { OtpEntity } from "domain/entities";

// export const saveOtp=async(email:string,otp:string):Promise<OtpEntity|null>=>{
//     try{
        
//         const save=await otpmodel.updateOne({
//             {email},
//             {$set:{otp}},
//             {upsert:true,new:true}
//         })

//         if(!save){
//             throw new Error('otp updating failed')
//         }
//         console.log('otp saved')
//         const savedOTp=await 

//     }catch()
// }

// import { Redis } from "utils/others/redis";
// const OTP_EXPIRATION_TIME = 5 * 60;
// const storeOtp=async(userName:string,otp:string)=>{
//     await Redis.set(`otp:${userName}`, otp, 'EX', OTP_EXPIRATION_TIME);
// }