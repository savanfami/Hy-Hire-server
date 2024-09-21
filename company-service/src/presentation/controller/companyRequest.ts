import { Request, Response, NextFunction } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'
import { ErrorResponse } from "../../utils/common/ErrorResponse";

export const companyRequestController = (dependencies: IDependencies) => {
    const { useCases: { companyRequestUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req?.user?.email as string
            if (email) {
                const data = await companyRequestUseCase(dependencies).execute(email)
                if (data) {
                    return res.status(200).json({ success: true, message: 'request sent successfully' })
                } else {
                    return next(ErrorResponse.unauthorized('failed to sent the request'))
                }
            } else {
                return next(ErrorResponse.badRequest('not found'))

            }
        } catch (error) {
            next(error)
        }
    }
}