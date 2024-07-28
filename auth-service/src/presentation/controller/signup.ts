import { Request,Response,NextFunction } from "express";
import { IDependencies } from "application/interfaces/IDependencies";
import { signupValidation } from "../../utils/validator/signupValidator";
import usercreatedProducer from "../../infrastructure/kafka/producer/usercreatedProducer";



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
                    try{
                        await usercreatedProducer(result)
                        console.log('user created producer sending')
                        return res.status(200).json({
                            success: true,
                            data: result,
                            message: 'otp sent successfully'
                        })

                    }catch(error){
                            console.log('something happend in producing ')
                            return res.json({
                                success: false,
                                message: "Somthing wrng in otp section"
                            })
                    }
                    
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