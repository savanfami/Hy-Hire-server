import { IDependencies } from "application/interfaces/IDependencies";


export const companyRequestUseCase = (dependencies: IDependencies) => {
    const { repositories: { sendRequest } } = dependencies
    return {
        execute: async (email: string) => {
            try {
                return await sendRequest(email)
            } catch (error: any) {
                throw error
            }
        }
    }

}