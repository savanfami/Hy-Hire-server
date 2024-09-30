import { Request,Response,NextFunction } from "express";

export const errorHandler=((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(',,,,,,,,error handler',err?.message)
    const statusCode=err.statusCode||500
    const message=err.message||'internal server error'
    console.log(statusCode,message)
    return res.status(statusCode).json({success:false,message,statusCode})
})