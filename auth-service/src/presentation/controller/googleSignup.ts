import { Request, Response, NextFunction } from "express";
import { IDependencies } from "application/interfaces/IDependencies";
import { generateToken } from "../../utils/jwt/generateToken";
import { UserEntity } from "domain/entities";
import usercreatedProducer from "../../infrastructure/kafka/producer/usercreatedProducer";
import { ErrorResponse } from "../../utils/common";
import { config } from "dotenv";
config()


export const googleSignupController = (dependencies: IDependencies) => {
    const { useCases: { findUserByEmailUsecase,createUserUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, userType } = req.body
            const userExist = await findUserByEmailUsecase(dependencies).execute(email)
            if(userType==='default'&& !userExist){
                return next(ErrorResponse.unauthorized('account not found...please register !!!'))
            }
            if (userExist) {
                // console.log('already authenticated user')
                const token = generateToken({ _id: name, email: email, role: String(userExist?.role), exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) ?? '' })
                // console.log(token, 'token from google signup')
                res.cookie('access_token',token,{maxAge:24*60*60*1000})
                return res.status(200).json({success:true,data:{
                    name,
                    email,
                    role:userExist?.role
                },message:'user login successfull'})
            }else{                                                                                                                                                                                                                                                                                                                     
                const userEntity:UserEntity={
                    name,
                    email,
                    password:'Savan@1234',
                    role:userType
                }
                const data=await createUserUsecase(dependencies).execute(userEntity) 
                console.log(data,'google auth signup')
               
                if(!data){
                    throw new Error('User Creation failed')
                }else{
                    try{
                        await usercreatedProducer(data)
                        console.log('user created producer sending')
                        const token = generateToken({ _id: String(data?.name), email: data?.email, role: String(data?.role), exp:Math.floor(Date.now()/1000)+(24*60*60) ?? '' })
                        console.log(token,'jwt token')
                        res.cookie('access_token', token, {
                          maxAge: 24 * 60 * 60 * 1000,
                      })
                        return res.status(200).json({
                          success: true,
                          data: {
                            name: data.name,
                            email: data.email,
                            role:data.role
                          },
                          message: "user created successfully",
                        });
                        
                    }catch(error){
                        console.log('something happened in producing')
                        return res.json({success:false,message:"something wrong in user creation"})
                    }
                }


            }
        } catch (error) {
            next(error)
        }
    }
}