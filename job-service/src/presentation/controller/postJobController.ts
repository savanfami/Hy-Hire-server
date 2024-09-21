import { IDependencies } from 'application/interfaces/IDependencies'
import { Request, Response,NextFunction} from 'express'
import { ErrorResponse } from '../../utils/common/ErrorResponse'


export const postJobController = (dependencies: IDependencies) => {
    const { useCases: { postJobUsecase } } = dependencies

    return async (req: Request, res: Response,next:NextFunction) => {
        try {
          if(req.body){
            const jobData=await postJobUsecase(dependencies).execute(req.body)
            if(jobData){
                return res.status(200).json(jobData)
            }else{
              return next(ErrorResponse.notFound('no data found'))
            }
          }else{
            return next(ErrorResponse.badRequest('body is empty'))          }

        } catch (error) {
          next(error)
        }
    }
} 