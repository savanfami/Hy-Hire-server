import { Request, Response, NextFunction } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'


export const getCompanyController = (dependencies: IDependencies) => {
    const { useCases: { getCompanyDataUseCase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const email = req?.user?.email as string
            if (email) {
                const data = await getCompanyDataUseCase(dependencies).execute(email)
                if (data) {
                    return res.status(200).json({success:true,message:'Company data fetched successfully',data})
                } else {
                    return res.status(400).json({ message: 'no data found' })
                }
            } else {
                throw new Error('no email found')
            }
 
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}