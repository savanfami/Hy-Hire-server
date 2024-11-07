import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction,Request,Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";

export const updateRescheduleController=(dependencies:IDependencies)=>{
    const {useCases:{updateRescheduleUsecase}}=dependencies
 return async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await updateRescheduleUsecase(dependencies).execute(req.body)
            if (response===false) {
                throw ErrorResponse.internalError('internal server error')
            }
            return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
 }
}