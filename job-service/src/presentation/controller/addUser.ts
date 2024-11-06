import { IDependencies } from 'application/interfaces/IDependencies'
import { Request, Response, NextFunction } from 'express'


export const addUserController = (dependencies: IDependencies) => {
    const { useCases: { addUserUsecase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body) {
                const updateData = await addUserUsecase(dependencies).execute(req.body)
                if (updateData) {
                    return res.status(200).json({ success: true, message: 'added succeessfully', })
                } else {
                    throw new Error('user creation or updation failed')
                }
            }
        } catch (error) {
            next(error)

        }
    }
}

