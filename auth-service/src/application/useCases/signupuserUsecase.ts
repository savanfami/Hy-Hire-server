import { IDependencies } from "application/interfaces/IDependencies";
import { UserEntity } from "domain/entities";

export const signupuserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { signup },
  } = dependencies;
  return {
    execute: async (data: UserEntity) => {
      try {
        return await signup(data);
      } catch (error) {
        throw error;
      }
    },
  };
};
