import { Request, Response, NextFunction } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'
import { ErrorResponse } from "../../utils/common/ErrorResponse";

export const listRequestController = (dependencies: IDependencies) => {
    const { useCases: { listRequestUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await listRequestUsecase(dependencies).execute()
            console.log(data,'daaata')
            if (data) {
                return res.status(200).json(data )
            } else {
                return next(ErrorResponse.unauthorized('failed to list the request'))
            }
        }
        catch (error) {
            next(error)
        }
    }
}
