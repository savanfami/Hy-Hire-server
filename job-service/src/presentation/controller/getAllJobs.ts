import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const getAllJobsController = (dependencies: IDependencies) => {
    const { useCases: { getAllJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await getAllJobUsecase(dependencies).execute()
            if(result){
                return res.status(200).json(result)
            }else{
                return next(ErrorResponse.notFound('data not found'))
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}