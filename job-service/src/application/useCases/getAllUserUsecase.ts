import { IDependencies } from "application/interfaces/IDependencies";
// import { IJobFilterParams } from "utils/types/types";


export const getAllUserUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllUser } } = dependencies
    return {
        execute: async () => {
            try {
                return await getAllUser()
            } catch (error) {
                throw error
            }
        }
    }
}
