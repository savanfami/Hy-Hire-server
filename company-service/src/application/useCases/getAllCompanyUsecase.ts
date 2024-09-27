import { IDependencies } from "application/interfaces/IDependencies";



export const getAllCompanyUsecase = (dependencies: IDependencies) => {

    const { repositories: { getAllCompany } } = dependencies
    return {
        execute: async () => {
            try {
                return await getAllCompany()
            } catch (error) {
                throw error
            }
        }
    }

}