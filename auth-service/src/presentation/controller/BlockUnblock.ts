import { NextFunction,Request,Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import blockUnblockProducer from "../../infrastructure/kafka/producer/blockUnblockProducer";
export const blockUnblockController=(dependencies:IDependencies)=>{
    const{useCases:{findByIdandUpdateUsecase}}=dependencies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try{

      const userId=req.params.userId
       const user=await findByIdandUpdateUsecase(dependencies).execute(userId)
    
       const isBlocked=user?.isBlocked
       const data={
        userId,
        isBlocked
       }
       if(user){
         try{
          
            await blockUnblockProducer(data)
            console.log('user block unblock producer sending')
            return res.status(200).json({
                success:true,
                data:{},
                message:'prodcer sent successfully'
            })

         }catch(error){
            console.error('errr in block producer',error)
         }
       }
        }catch(error:any){
            next(error)
        }
    }
}