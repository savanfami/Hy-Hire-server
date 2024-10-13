import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { IsearchUser } from "utils/types/types";


export const getUserController = (dependencies: IDependencies) => {
    const { useCases: { getallUserUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search='',page } = req.query as unknown as IsearchUser
            const data = {
                search: search.trim(),
                page: parseInt(page as string, 10) || 1
            };
            const result = await getallUserUsecase(dependencies).execute(data)
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