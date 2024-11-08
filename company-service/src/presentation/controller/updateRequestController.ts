import { IDependencies } from "application/interfaces/IDependencies"
import { Request, Response, NextFunction } from "express"
import { ErrorResponse } from "../../utils/common/ErrorResponse";
import { Approvalstatus, IUpdateRequestPayload } from "../../utils/types/allTypes";
import verificationMailProducer from "../../infrastructure/kafka/producer/verificationMailProducer";



export const updateRequestController = (dependencies: IDependencies) => {

    const { useCases: { updateRequestUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { companyId, status, reason } = req.body
            if (!companyId) {
                throw ErrorResponse.notFound('no company id found')
            }
            let updatePayload: IUpdateRequestPayload = { status }
            if (status === Approvalstatus.REJECTED && reason) {
                updatePayload.reason = reason
            }
            const data = await updateRequestUsecase(dependencies).execute(companyId, updatePayload);
            if (data) {
                try {
                    await verificationMailProducer(data);
                } catch (error) {
                    console.log('Mail sending failed', error);
                }

                return res.status(200).json({ message: 'Successfully updated', data });
            }else{
                return next(ErrorResponse.unauthorized('Failed to update request'));
            }
        } catch (error: any) {
            next(error)
        }
    }
}