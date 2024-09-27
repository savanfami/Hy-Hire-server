import { IDependencies } from "application/interfaces/IDependencies";
import { IJobFilterParams } from "utils/types/types";


export const getAllJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllJobs } } = dependencies
    return {
        execute: async (data:IJobFilterParams) => {
            try {
                return await getAllJobs(data)
            } catch (error) {
                throw error
            }
        }
    }
}
