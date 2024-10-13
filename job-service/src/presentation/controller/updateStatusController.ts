import { IDependencies } from "application/interfaces/IDependencies"
import { ErrorResponse } from "../../utils/common/ErrorResponse"
import { Request, Response, NextFunction } from "express";
import { IUpdateStatusPayload } from "utils/types/types";
import hiringStatusUpdatingProducer from "../../infrastructure/kafka/producer/hiringStatusUpdatingProducer";


export const updateStatusController = (dependencies: IDependencies) => {
    const { useCases: { updateStatusUsecase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { applicationId, hiringStatus, interviewDate ,interviewTime } = req.body;
            if (!applicationId || !hiringStatus) {
                throw ErrorResponse.badRequest('ApplicationId and status are required');
            }
            const payload:IUpdateStatusPayload = {
                applicationId,
                hiringStatus
            };

            if (hiringStatus === 'shortlisted' && interviewDate && interviewTime ) {
                payload.interviewDate = new Date(interviewDate);
                payload.interviewTime=interviewTime
            }

            const result = await updateStatusUsecase(dependencies).execute(payload);
            if(result.hiringStatus==='shortlisted'){
                try{
                    await hiringStatusUpdatingProducer(result)
                }catch{
                  throw ErrorResponse.internalError('failed to send update status mail producer')
                }
            }
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
};