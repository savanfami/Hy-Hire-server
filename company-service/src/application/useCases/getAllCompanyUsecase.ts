import { IDependencies } from "application/interfaces/IDependencies";
import { ICompanySearchParams } from "utils/types/allTypes";



export const getAllCompanyUsecase = (dependencies: IDependencies) => {

    const { repositories: { getAllCompany } } = dependencies
    return {
        execute: async (data:ICompanySearchParams) => {
            try {
                return await getAllCompany(data)
            } catch (error) {
                throw error
            }
        }
    }

}