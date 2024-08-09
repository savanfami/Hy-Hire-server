import { Request, Response, NextFunction } from "express";
import { IDependencies } from "application/interfaces/IDependencies";
import { signupValidation } from "../../utils/validator/signupValidator";
import otpcreatedproducer from "../../infrastructure/kafka/producer/otpcreatedProducer";

export const signupController = (dependencies: IDependencies) => {
  const {
    useCases: { signupuserUseCase, findUserByEmailUsecase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = signupValidation.validate(req.body);
      if (error) {
        return next({ status: 400, message: error?.message });
      }

      const userExist = await findUserByEmailUsecase(dependencies).execute(value.email);
      if (userExist) {
        return next({ statusCode: 409, message: 'E-mail already in use' });
      }

      const result = await signupuserUseCase(dependencies).execute(value);
      if (result) {
        try {
          await otpcreatedproducer(result);
          console.log("OTP created producer sending");
          return res.status(201).json({
            success: true,
            data: result,
            message: "OTP sent successfully",
          });
        } catch (error) {
          console.error("Error in OTP producer:",error);
          return next({ statusCode: 500, message: "Something went wrong in the OTP producer section" });
        }
      } else {
        return next({ statusCode: 500, message: "Something went wrong with otp creation" });
      }
    } catch (erorr) {
      next(erorr);
    }
  };
};
