import { IDependencies } from "application/interfaces/IDependencies";
import { IUpdateStatusPayload } from "utils/types/types";


export const updateStatusUsecase = (dependencies: IDependencies) => {
    const { repositories: { updateStatus } } = dependencies
    return {
        execute: async (payload: IUpdateStatusPayload) => {
            try {
                return await updateStatus(payload)
            } catch (error) {
                throw error
            }
        }
    }
}

