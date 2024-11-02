import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const getCompanyDashboardController = (dependencies: IDependencies) => {
    const { useCases: { getCompanydashboardDataUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const companyId=req.user?._id as string
            const response = await getCompanydashboardDataUsecase(dependencies).execute(companyId)
            if (!response) {
                throw ErrorResponse.internalError('internal server error')
            }
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}