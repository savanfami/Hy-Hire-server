import { IDependencies } from "application/interfaces/IDependencies";
import { signupController } from "./signup";
import { verifyOtpController } from "./verifyOtp";
import { loginContoller } from "./login";
import {getUserController} from './getUser'
import { logOutController } from "./logout";
import { forgotPasswordController } from "./forgotPassword";
import { resetPasswordController } from "./resetPassword";
import { googleSignupController } from "./googleSignup";
import { blockUnblockController } from "./BlockUnblock";
import { resendOtpController } from "./resendOtp";




export const controller = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
    verifyOtp:verifyOtpController(dependencies),
    userLogin:loginContoller(dependencies),
    getUserData:getUserController(dependencies),
    logOut:logOutController(),
    forgotPassword:forgotPasswordController(dependencies),
    resetPassword:resetPasswordController(dependencies),
    googleSignup:googleSignupController(dependencies),
    blockUnblock:blockUnblockController(dependencies),
    resendOtp:resendOtpController(dependencies)
  };
};
