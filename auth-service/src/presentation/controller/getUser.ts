import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getUserController=(dependencies:IDependencies)=>{
    const {useCases:{findUserByIdUsecase}}=dependencies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
        if(!req.user){
            throw new Error('user data not present in req')
        }
        const result=await findUserByIdUsecase(dependencies).execute(req.user._id)
        if(!result){
            throw new Error("user doesn't exist")
        }

        res.status(200).json({
            success:true,
            data:result,
            message:'user data fetched'
        })

        }catch(error){
            next(error)
        }
    }
}