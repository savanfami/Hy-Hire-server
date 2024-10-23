import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction ,Request,Response} from "express";
import { ErrorResponse } from "../../../utils/common/ErrorResponse";



export const getChatController=(dependencies:IDependencies)=>{
    const {useCases:{getChatUsecase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {    
            const userId=req.user?._id as string
            const role=req.user?.role as string
            if(!userId || !role){
                throw ErrorResponse.badRequest('no user id found')
            }
            const response=await getChatUsecase(dependencies).execute(userId,role)
            if(!response){
                throw ErrorResponse.internalError('internal server error')
            }
            return res.status(200).json(response)
        } catch (error) {
           next(error) 
        }
    }
}