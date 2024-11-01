import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction,Request,Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const getAdminDashboardController=(dependencies:IDependencies)=>{
    const {useCases:{getAdminDashboardDataUsecase}} =dependencies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
       const response= await getAdminDashboardDataUsecase(dependencies).execute()
            if(!response){
                throw ErrorResponse.internalError('internal server error')
            }
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}