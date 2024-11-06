import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction,Request,Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";

export const rescheduleInterviewController=(dependencies:IDependencies)=>{
    const {useCases:{rescheduleInterviewUsecase}}=dependencies
 return async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await rescheduleInterviewUsecase(dependencies).execute(req.body)
            if (response===false) {
                throw ErrorResponse.internalError('internal server error')
            }
            return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
 }
}