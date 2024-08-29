import { Request, Response, NextFunction } from 'express'
import { IDependencies } from 'application/interfaces/IDependencies'

export const updateProfileController = (dependencies: IDependencies) => {
    const { useCases: { updateProfileUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { name, website, location, foundedDate, sector, subIndustry, companyDescription, icon, profileCompleted } = req.body
            const email = req?.user?.email as string
            const datas = {
                name,
                website,
                location,
                foundedDate,
                sector,
                subIndustry,
                profileCompleted,
                description: companyDescription,
                icon
            }
            const data = await updateProfileUsecase(dependencies).execute(datas, email)
            console.log(data, 'updae fdfadsfadsf')
            if (data) {

                return res.status(200).json({ success: true, message: 'updated successfully', data })
            } else {
                throw new Error('data updation failed')
            }


        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}