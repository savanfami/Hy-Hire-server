import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateOtp } from "../../utils/common/generateOtp";
import { storeOtp } from "../../infrastructure/database/redis/saveOtp";
import otpcreatedproducer from "../../infrastructure/kafka/producer/otpcreatedProducer";


export const resendOtpController=(dependencies:IDependencies)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const email=req.body.email
            const otp=generateOtp()
            const data={
                otp:otp as string,
                name:req.body.name as string,
                email:req.body.email as string
            }
          const saveOtp = await storeOtp(email,otp);
        //   console.log(saveOtp,'otp saved successfully')
          if(!saveOtp){
            throw new Error ('failed to store otp')
          }else{
            try {
                await otpcreatedproducer(data);
                console.log("OTP created producer sending");
                return res.status(201).json({
                  success: true,
                  message: "OTP sent successfully"
                });
              } catch (error) {
                console.error("Error in OTP producer:",error);
                return next({ statusCode: 500, message: "Something went wrong in the OTP producer section" });
              }
          }

        }catch(error){
            next(error)
        }
    }
}

