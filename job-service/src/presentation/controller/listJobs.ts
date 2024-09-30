import { IDependencies } from 'application/interfaces/IDependencies'
import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '../../utils/common/ErrorResponse'
import { ListJobsQuery } from 'utils/types/types'


export const listJobsController = (dependencies: IDependencies) => {
    const { useCases: { getJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query as unknown as ListJobsQuery;
            const { page, search = '', companyId } = query

            const pageNumber = parseInt(page as string)
            if (isNaN(pageNumber) || pageNumber <= 0) {
                throw ErrorResponse.badRequest('invalid page number')
            }
            const jobData = await getJobUsecase(dependencies).execute(companyId, pageNumber, search)
            if (jobData) {
                return res.status(200).json(jobData)
            } else {
                throw ErrorResponse.notFound('data not found')
            }
        } catch (error) { 
            next(error)
        }
    }
} 