import { IDependencies } from "application/interfaces/IDependencies";



export const getCompanyDataUseCase = (dependencies: IDependencies) => {

    const { repositories: { findByEmail } } = dependencies
    return {
        execute: async (email: string) => {
            try {

                return await findByEmail(email)

            } catch (error) {
                throw error
            }
        }
    }

}