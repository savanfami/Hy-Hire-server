import { IDependencies } from "application/interfaces/IDependencies";
import { signupController } from "./signup";
import { verifyOtpController } from "./verifyOtp";
import { loginContoller } from "./login";



export const controller = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
    verifyOtp:verifyOtpController(dependencies),
    userLogin:loginContoller(dependencies)
  };
};
