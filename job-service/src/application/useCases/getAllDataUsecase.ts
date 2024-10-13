import { IDependencies } from "application/interfaces/IDependencies";


export const getAllDataUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllData } } = dependencies
    return {
        execute: async () => {
            try {
                return await getAllData()
            } catch (error) {
                throw error
            }
        }
    }
}
