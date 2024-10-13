import { IDependencies } from "application/interfaces/IDependencies";
import { getApplicationPayload } from "utils/types/types";


export const getApplicationsByUserUsecase = (dependencies: IDependencies) => {
    const { repositories: { getApplicationsByUser } } = dependencies
    return {
        execute: async (data:getApplicationPayload) => {
            try {
                return getApplicationsByUser(data)
            } catch (error) {
                throw error
            }
        }
    }
}
