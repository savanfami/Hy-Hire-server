// import { IDependencies } from 'application/interfaces/IDependencies'
// import { Request, Response, NextFunction } from 'express'


// export const addUserController = (dependencies: IDependencies) => {
//     const { useCases: { addUserUsecase } } = dependencies

//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             if (req.body) {
//                 console.log(req.body,'bodyydydy')
//                   const updateData=  await addUserUsecase(dependencies).execute(req.body)
//                   if(updateData){
//                     console.log('user creaeted or updated successfully in job service')
//                   }else{
//                     throw new Error('user creation or updation failed')
//                   }
//                 //     const jobData=await postJobUsecase(dependencies).execute(req.body)
//                 //     if(jobData){
//                 //         return res.status(200).json(jobData)
//                 //     }else{
//                 //       return next(ErrorResponse.notFound('no data found'))
//                 //     }
//                 //   }else{
//                 //     return next(ErrorResponse.badRequest('body is empty'))          }
                
//             }
//         } catch (error) {
//             next(error)

//         }
//     }
// }