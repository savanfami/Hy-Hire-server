import { IDependencies } from "application/interfaces/IDependencies";


export const getCountUsecase = (dependencies: IDependencies) => {
    const { repositories: { getCount } } = dependencies
    return {
        execute: async () => {
            try {
                return getCount()
            } catch (error) {
                throw error
            }
        }
    }
}
