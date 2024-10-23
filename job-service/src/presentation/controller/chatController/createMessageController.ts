import { IDependencies } from "application/interfaces/IDependencies"
import { NextFunction,Request,Response } from "express"
import { ErrorResponse } from "../../../utils/common/ErrorResponse";
import { ICreateMessagePayload } from "utils/types/types"


export const createMessageController=(dependencies:IDependencies)=>{
    const {useCases:{createMessageUsecase}}=dependencies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const senderId=req.user?._id
            const data:ICreateMessagePayload={
                chatId:req.body.chatId,
                message:req.body.message
            }
            if(!senderId){
                throw ErrorResponse.badRequest('no sender found')
            }
             const response=await createMessageUsecase(dependencies).execute(data)
             if(!response){
                throw ErrorResponse.internalError('failed to creaet Message')
             }
             return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}