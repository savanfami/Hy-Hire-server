import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getUserController = (dependencies: IDependencies) => {
    const { useCases: { getallUserUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const result = await getallUserUsecase(dependencies).execute()
            // console.log(result, 'resutl from teh controller')
            if (!result) {
                throw new Error("users doesn't exist")
            }

            return res.status(200).json({
                success: true,
                data: result,
                message: 'users data fetched successfully'
            })

        } catch (error) {
            next(error)
        }
    }
}