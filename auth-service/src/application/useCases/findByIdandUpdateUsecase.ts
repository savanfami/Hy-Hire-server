import { IDependencies } from "application/interfaces/IDependencies";

export const findByIdandUpdateUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { findByIdandUpdate } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await findByIdandUpdate(id)

            } catch (error) {
                throw Error
            }
        }
    }
}
