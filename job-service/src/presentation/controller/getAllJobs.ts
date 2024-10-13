import { IDependencies } from "application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/common/ErrorResponse";
import { IJobFilterParams } from "utils/types/types";



export const getAllJobsController = (dependencies: IDependencies) => {
    const { useCases: { getAllJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(req.query){
                const data:IJobFilterParams={
                    page: req.query.page as string, 
                    salaryUpto: req.query.salaryUpto && req.query.salaryUpto !=='0'? (req.query.salaryUpto as string ):null,
                    jobTypes: req.query.jobTypes?  (req.query.jobTypes as string[]):null ,
                    datePosted: req.query.datePosted ? (req.query.datePosted as string) : null,
                    jobname:req.query.jobname?(req.query.jobname as string):null,
                    location:req.query.location?(req.query.location as string):null,
                }
                const result = await getAllJobUsecase(dependencies).execute(data)
                if(result){
                    return res.status(200).json(result)
                }else{
                    return next(ErrorResponse.notFound('data not found'))
                }
            }else{ 
                console.log('no query found') 
            }
        } catch (error) {
            next(error)
        }
    }
}