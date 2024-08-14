import { IDependencies } from "application/interfaces/IDependencies";

export const findUserByIdUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { findUserById } } = dependencies
    return {
        execute: async (data: string) => {
            try {
                return await findUserById(data)

            } catch (error) {
                throw Error
            }
        }
    }
}
