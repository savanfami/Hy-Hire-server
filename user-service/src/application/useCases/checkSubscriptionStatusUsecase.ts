import { IDependencies } from "application/interfaces/IDependencies";


export const checkSubscriptionStatusUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { getSubscriptionStatus } } = dependencies;

return {
    execute: async (userId:string) => {
        try {
            return await getSubscriptionStatus(userId)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
}