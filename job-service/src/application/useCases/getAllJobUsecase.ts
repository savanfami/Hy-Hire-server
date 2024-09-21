import { IDependencies } from "application/interfaces/IDependencies";


export const getAllJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllJobs } } = dependencies
    return {
        execute: async () => {
            try {
                return await getAllJobs()
            } catch (error) {
                throw error
            }
        }
    }
}
