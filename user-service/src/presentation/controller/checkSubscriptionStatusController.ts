import { IDependencies } from "application/interfaces/IDependencies"
import { Request, Response, NextFunction } from "express"


export const checkSubscriptionStatusController = (dependencies: IDependencies) => {
    const { useCases: { checkSubscriptionStatusUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?._id as string
        try {
            const data=await checkSubscriptionStatusUsecase(dependencies).execute(userId)
            if(!data){
               return res.status(404).json({message:'internal server error'})
             }
             return res.status(200).json(data)
        } catch (error) {
            next(error)   
        }
    }
}