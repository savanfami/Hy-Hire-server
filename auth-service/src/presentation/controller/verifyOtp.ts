import { NextFunction, Response, Request } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
// import { UserEntity } from "domain/entities";
import usercreatedProducer from "../../infrastructure/kafka/producer/usercreatedProducer";
import { generateToken } from "../../utils/jwt/generateToken";
import { hashPassword } from "../../utils/common/hashPassword";


export const verifyOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { verifyotpUsecase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { name, email, password, otp,role } = req.body;
      const userEntity = {
        name,
        email,
        password ,
        otp,
        role
      };

      userEntity.password=await hashPassword(userEntity.password)
     
   

      const data = await verifyotpUsecase(dependencies).execute(userEntity);
      
      if(data){
        try{
            await usercreatedProducer(data)
            console.log('user created producer sending')
            const token = generateToken({ _id: `${data?._id}`, email: data?.email, role: String(data?.role), exp:Math.floor(Date.now()/1000)+(24*60*60)})
            console.log(token,'jwt token')
            res.cookie('access_token', token, {
              httpOnly: true, sameSite: 'none', secure: true,
              maxAge: 24 * 60 * 60 * 1000
          })
            return res.status(200).json({
              success: true,
              data: {
                name: data.name,
                email: data.email,
                role:data.role
              },
              message: "OTP verified successfully",
            });
            
        }catch(error){
            console.log('something happened in producing')
            return res.json({success:false,message:"something wrong in user creation"})
        }
      }
    } catch (error:any) {
      
      next(error);
    }
  };
};
