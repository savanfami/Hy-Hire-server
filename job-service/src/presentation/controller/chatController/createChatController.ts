import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction ,Request,Response} from "express";
import { ErrorResponse } from "../../../utils/common/ErrorResponse";
import { IChatpayload } from "utils/types/types";


export const createChatController=(dependencies:IDependencies)=>{
    const {useCases:{createChatUsecase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {    
            const userId=req.user?._id as string
            const companyId=req.body?.id as string
            if(!companyId){
                throw  ErrorResponse.notFound('no company found')
            }
            const data:IChatpayload={
                recieverId:companyId,
                senderId:userId
            }
            const response=await createChatUsecase(dependencies).execute(data)
              if(!response){
                throw ErrorResponse.internalError('internal server error')
              }
              return res.status(200).json(response)
        } catch (error) {
           next(error) 
        }
    }
}