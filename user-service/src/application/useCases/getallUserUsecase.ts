import { IDependencies } from "application/interfaces/IDependencies";
import { IsearchUser } from "utils/types/types";


export const getallUserUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { getAllUser } } = dependencies;

return {
    execute: async (data:IsearchUser) => {
        try {
            return await getAllUser(data)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
}