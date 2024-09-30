import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const deleteJobsController = (dependencies: IDependencies) => {
    const { useCases: { deleteJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobId = req.query.jobId as string
            if (!jobId) {
                throw ErrorResponse.notFound('no jobid found')
            }
            const result = await deleteJobUsecase(dependencies).execute(jobId)
            if (!result) {
                throw ErrorResponse.internalError('error happened in delete jobs')
            } else {
                return res.status(200).json({ success: true, message: 'deleted successfully' })
            }
        } catch (error) {
            next(error)
        }
    }
}