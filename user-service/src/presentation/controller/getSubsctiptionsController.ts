import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";


export const getSubscriptionController = (dependencies: IDependencies) => {
    const { useCases: { getSubscriptionsUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await getSubscriptionsUsecase(dependencies).execute()
            if (!response) {
                return res.status(404).json({ message: 'internal server error' })
            }
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}