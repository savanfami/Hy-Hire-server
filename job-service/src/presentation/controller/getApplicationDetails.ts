import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";


export const getApplicationDetailsController = (dependencies: IDependencies) => {
    const { useCases: { getApplicationDetailsUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string
            if (!id) {
                throw ErrorResponse.badRequest('no applicant id found')
            }
            const response = await getApplicationDetailsUsecase(dependencies).execute(id)
            if(!response){
                throw ErrorResponse.internalError('failed to fetch Data ')
            }
            return res.status(200).json(response)
   
        } catch (error) {
            next(error)
        }
    }
}