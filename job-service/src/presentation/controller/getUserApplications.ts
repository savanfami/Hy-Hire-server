import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";
import { getApplicationPayload, QueryParams } from "utils/types/types";




export const getApplicationByUserController = (dependencies: IDependencies) => {
    const { useCases: { getApplicationsByUserUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search = '', page = '1' } = req.query as QueryParams
            const userId = req?.user?._id as string
            if (!userId) {
                throw ErrorResponse.unauthorized('no user found')
            }
            const data: getApplicationPayload = {
                search,
                page: parseInt(page, 10),
                userId
            }
            const result = await getApplicationsByUserUsecase(dependencies).execute(data)
            if (!result) {
                throw ErrorResponse.internalError('some error occured')
            }
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}  