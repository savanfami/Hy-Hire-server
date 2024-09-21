import { IDependencies } from "application/interfaces/IDependencies";


export const listRequestUsecase = (dependencies: IDependencies) => {

    const { repositories: { listRequest } } = dependencies
    return {
        execute: async () => {
            try {

                return await listRequest()

            } catch (error) {
                throw Error
            }
        }
    }


}