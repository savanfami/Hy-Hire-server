import { IDependencies } from "application/interfaces/IDependencies"
import { Request, Response, NextFunction } from "express"


export const getUserDataController = (dependencies: IDependencies) => {
    const { useCases: { getUserDataUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.user?.email
            if (!email) {
                throw new Error('email not found')
            } else {
                const data = await getUserDataUsecase(dependencies).execute(email)
                if (data) {
                    return res.status(200).json({ success: true, message: 'user data fetched successfully', data })
                } else {
                    throw new Error("failed to get user data")
                }
            }
        } catch (error) {
            next(error)   
        }
    }
}