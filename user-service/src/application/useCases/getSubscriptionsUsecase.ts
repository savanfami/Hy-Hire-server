import { IDependencies } from "application/interfaces/IDependencies";


export const getSubscriptionsUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { getSubscriptions } } = dependencies;
    return {
        execute: async () => {
            try {
                return await getSubscriptions()
            } catch (error: any) {
                throw new Error(error.message)
            }
        }
    }
}