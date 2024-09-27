import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const applyJobController = (dependencies: IDependencies) => {
    const { useCases: { applyForJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {resume,companyId,jobId}=req.body
            console.log(req.body)
            const userId=req?.user?._id as string
            if(req.body){
                const result=await applyForJobUsecase(dependencies).execute(userId,companyId,resume,jobId)
                if(result){
                    return res.status(200).json({message:'applied successfully'})
                }else{
                    throw new ErrorResponse(400,'cannot apply for job')
                }
            }
        } catch (error) {
            next(error)
        }
    }
}