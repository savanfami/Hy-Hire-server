import { IDependencies } from "application/interfaces/IDependencies";
import { UserEntity } from "domain/entity";


export const updateProfileUsecase = (dependencies: IDependencies) => {
    const {
        repositories: { updateProfile } } = dependencies;

return {
    execute: async (email:string,data:UserEntity) => {
        try {
            return await updateProfile(email,data)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
}