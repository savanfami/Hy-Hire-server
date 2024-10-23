import { IDependencies } from "application/interfaces/IDependencies";
import { Request,Response,NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";


export const getCountController = (dependencies: IDependencies) => {
    const { useCases: { getCountUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
         const response= await getCountUsecase(dependencies).execute()
         if(response){
           return res.status(200).json(response)
         }else{
            throw ErrorResponse.internalError('internal server error')
         }
        } catch (error) {
            next(error)
        }
    }
}