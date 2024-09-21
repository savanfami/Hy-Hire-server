import { IDependencies } from "application/interfaces/IDependencies"
import { Request, Response, NextFunction } from "express"
import { ErrorResponse } from "../../utils/common/ErrorResponse";
import verificationMailProducer from "../../infrastructure/kafka/producer/verificationMailProducer";



export const updateRequestController = (dependencies: IDependencies) => {

    const { useCases: { updateRequestUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { companyId, status } = req.body
            if (companyId) {
                const data = await updateRequestUsecase(dependencies).execute(companyId, status)
                console.log(data,'dataafasdsfdjfdasfdafd=>>>>>>>>>><======= ')
                if (data) {
                    try {
                        await verificationMailProducer(data)
                    } catch (error) {
                        console.log('mail sending failed', error)
                    }
                    return res.status(200).json({ message: 'successfully updated', data })
                } else {
                    return next(ErrorResponse.unauthorized('failed to update request'))
                }
            } else {
                throw new Error('no id found ')
            }
        } catch (error: any) {
            next(error)
        }
    }
}

