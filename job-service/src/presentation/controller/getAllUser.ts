import { IDependencies } from "application/interfaces/IDependencies";
import { Request,Response,NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";


export const getAllUserController = (dependencies: IDependencies) => {
    const { useCases: { getAllUserUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
         const response= await getAllUserUsecase(dependencies).execute()
         if(response){
           return res.status(200).json(response)
         }else{
            throw ErrorResponse.notFound('no data found')
         }
        } catch (error) {
            next(error)
        }
    }
}