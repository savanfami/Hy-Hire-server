import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction,Request,Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";

export const getAllCompanyController=(dependencies:IDependencies)=>{
    const{useCases:{getAllCompanyUsecase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
          const data=  await getAllCompanyUsecase(dependencies).execute()
         if(data){
            return res.status(200).json({success:true,message:'data fetched successfully',data})
         }else{
            return (ErrorResponse.notFound('no data found'))
         }
        } catch (error) {
            next(error)
        }
    }
}   