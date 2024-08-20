import { IDependencies } from "application/interfaces/IDependencies";
import { UserEntity } from "domain/entities";

export const createUserUsecase = (dependencies: IDependencies) => {
  const {
    repositories: { createUser },
  } = dependencies;
  return {
    execute: async (data: UserEntity) => {
      try {
        return await createUser(data);
      } catch (error) {
        throw error;
      }
    },
  };
};
