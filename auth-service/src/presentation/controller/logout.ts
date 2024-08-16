import { NextFunction, Request, Response } from "express"


export const logOutController=()=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
          res.clearCookie('access_token')
          return res.status(200).json({message:'logout successfull'})

        }catch(error){
            next(error)
        }
    }
}