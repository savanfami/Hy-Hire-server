import { NextFunction,Response,Request } from "express";
import jwt from 'jsonwebtoken'

interface userPayload{
    _id:string;
    email:string;
    role:string;
}

declare global {
    namespace Express {
      interface Request {
        user?: userPayload; 
      }
    }
  }

export const jwtMiddleware=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    const token=req.cookies.access_token||(req.headers.authorization?.split('')[1]||'')
    if(!token){
        return res.status(401).json({message:'no token found'})
    }
    try{
        const decode=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log(decode,'decoded')
        req.user=decode
        next()

    }catch(error){
       return res.status(403).json({message:'failed to authenticate token'})
    }
}