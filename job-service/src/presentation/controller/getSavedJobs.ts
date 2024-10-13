import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";
// import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const getSavedJobsController = (dependencies: IDependencies) => {
    const { useCases: { savedJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req?.user?._id as string
            const result = await savedJobUsecase(dependencies).execute(userId)
            if (!result) {
                return next(ErrorResponse.notFound('data not found'))
            }
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}  