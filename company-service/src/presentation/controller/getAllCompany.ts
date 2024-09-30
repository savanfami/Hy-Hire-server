import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction,Request,Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";
import { ICompanySearchParams } from "utils/types/allTypes";

export const getAllCompanyController=(dependencies:IDependencies)=>{
    const{useCases:{getAllCompanyUsecase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log(req.query,'params')
            const searchParams: ICompanySearchParams = {
                name: (req.query.name as string) || '',
                location: (req.query.location as string) || '',
                industry: (req.query.industry as string) || '',
                page: parseInt(req.query.page as string, 10) || 1,  
              };
          const data=  await getAllCompanyUsecase(dependencies).execute(searchParams)
          console.log(data,'getallcompanyies')
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