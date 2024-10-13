import { IDependencies } from "application/interfaces/IDependencies";



export const findBycategoryUsecase = (dependencies: IDependencies) => {

    const { repositories: {findByCategory} } = dependencies
    return {
        execute: async (name:string) => {
            try {
                return await findByCategory(name)
            } catch (error) {
                throw error
            }
        }
    }

}