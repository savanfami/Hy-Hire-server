import { IDependencies } from "application/interfaces/IDependencies"
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";
// import { ErrorResponse } from "../../utils/common/ErrorResponse";


export const saveJobController = (dependencies: IDependencies) => {
    const { useCases: { saveJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?._id as string
            const jobId = req.query.jobId as string
            const response = await saveJobUsecase(dependencies).execute(jobId, userId)
            if (response===null) {
                throw ErrorResponse.internalError('failed to save or unsave job')
            }
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}