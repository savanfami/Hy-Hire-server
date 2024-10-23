import { IDependencies } from "application/interfaces/IDependencies";


export const getApplicationDetailsUsecase = (dependencies: IDependencies) => {
    const { repositories: { getApplicationDetails } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await getApplicationDetails(id)
            } catch (error) {
                throw error
            }
        }
    }
}