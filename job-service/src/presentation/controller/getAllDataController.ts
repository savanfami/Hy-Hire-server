import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";



export const getAllDataController = (dependencies: IDependencies) => {
    const { useCases: { getAllDataUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data=await getAllDataUsecase(dependencies).execute()
            if (!data) {
                throw ErrorResponse.notFound('No data found');
            }
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}  