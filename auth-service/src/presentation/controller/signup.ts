import { Request,Response,NextFunction } from "express";
import { IDependencies } from "application/interfaces/IDependencies";
import { signupValidation } from "../../utils/validator/signupValidator";



export const signupController = (dependencies: IDependencies) => {
    const { useCases: { signupuserUseCase } } = dependencies;
    return async (req: Request, res: Response , next:NextFunction) => {
        try {
            const {error , value} = signupValidation.validate(req.body);
            if(error){
                throw new Error(error?.message)
            }
            if(value){
                const result = await signupuserUseCase(dependencies).execute(value);
                console.log(result,"result............ form signupuseUsecase")
                if(result){
                    
                    console.log('result from the signup ')
                    
                } else {
                    return res.status(400).json({'message':'something has happened'})
                }
            } else {
                return res.status(400).json({'message':"something happened"})
            }
        } catch (error) {
            next(error)
        }
    }
}