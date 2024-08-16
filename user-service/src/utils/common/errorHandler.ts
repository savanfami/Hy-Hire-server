import { Request,Response,NextFunction } from "express";


export const errorHandler=((err:any,req:Request,res:Response,next:NextFunction)=>{
// console.log(err,'error from error handler')
const statusCode=err.statusCode||500
const message=err.message||'internal server error'
return res.status(statusCode).json({success:false,message,statusCode})

    
})