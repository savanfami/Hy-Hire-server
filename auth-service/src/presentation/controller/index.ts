import { IDependencies } from "application/interfaces/IDependencies";
import { signupController } from "./signup";

export const controller = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
  };
};
