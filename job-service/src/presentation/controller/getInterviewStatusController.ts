import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const getInterviewStatusController = (dependencies: IDependencies) => {
    const { useCases: { getInterviewStatusUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id=req.params.id
            if(!id){
                throw ErrorResponse.badRequest('no job id found')
            }
            const response = await getInterviewStatusUsecase(dependencies).execute(id)
            if (!response) {
                throw ErrorResponse.internalError('internal server error')
            }
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}