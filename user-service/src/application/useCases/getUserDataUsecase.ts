import { IDependencies } from "application/interfaces/IDependencies";

export const getUserDataUsecase = (dependencies: IDependencies) => {
    const { repositories: { getUserData } } = dependencies
    return {
        execute: async (email: string) => {
            try {
                return await getUserData(email)
            } catch (error: any) {
                throw new Error(error?.message)

            }
        }
    }
}