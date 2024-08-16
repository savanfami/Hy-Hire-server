import { IDependencies } from "application/interfaces/IDependencies";


export const getallUserUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { getAllUser } } = dependencies;

return {
    execute: async () => {
        try {
            return await getAllUser()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
}