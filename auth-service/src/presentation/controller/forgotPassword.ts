import { NextFunction,Request,Response } from "express";
import { generateForgetToken } from "../../utils/jwt/generateForgetToken";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../utils/common";
import forgePasswordProducer from "../../infrastructure/kafka/producer/forgePasswordProducer";
export const forgotPasswordController=(dependencies:IDependencies)=>{
    
    const {useCases:{findUserByEmailUsecase}}=dependencies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
       
            const {values:{email}}=req.body
            if(!email){
                return next(ErrorResponse.unauthorized('no email found'))
            }
            const userExist=await findUserByEmailUsecase(dependencies).execute(email)
              console.log(userExist,'user from db')
              if(!userExist){
                return next(ErrorResponse.unauthorized("can't find an account with this email"))
              }
              const token=generateForgetToken(email)
              await forgePasswordProducer({email,token})
              res.status(200).json({success:true,message:'link to reset your password is sent to your email'})

        }catch(error:any){
            next(error)
        }

    }

}