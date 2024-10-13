import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const getUserDetailsByJobController = (dependencies: IDependencies) => {
    const { useCases: { getApplicantDetailsByJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { jobId } = req.params
            const result = await getApplicantDetailsByJobUsecase(dependencies).execute(jobId)
            if (!result) {
                return next(ErrorResponse.notFound('data not found'))
            }
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}  