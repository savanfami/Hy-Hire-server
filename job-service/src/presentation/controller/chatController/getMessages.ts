import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction ,Request,Response} from "express";
import { ErrorResponse } from "../../../utils/common/ErrorResponse";



export const getMessageController=(dependencies:IDependencies)=>{
    const {useCases:{getMessagesUsecase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {  
            const {chatId}=req.query as any
            const response=await getMessagesUsecase(dependencies).execute(chatId)
            if(!response){
                throw ErrorResponse.internalError('internal server error')
            }
            return res.status(200).json(response)
        } catch (error) {
           next(error) 
        }
    }
}