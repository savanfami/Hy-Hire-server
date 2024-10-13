import { Request, Response, NextFunction } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'
import { ErrorResponse } from '../../utils/common/ErrorResponse'


export const getCompanyByCategoryController = (dependencies: IDependencies) => {
    const { useCases: { findBycategoryUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const name = req.query?.name as string
            if(!name){
                throw ErrorResponse.notFound('not category found')
            }
            const data = await findBycategoryUsecase(dependencies).execute(name)
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(400).json({ message: 'no data found' })
            }
        } catch (error) {
            next(error)
        }
    }  
}