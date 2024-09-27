import { IDependencies } from "application/interfaces/IDependencies";


export const applyForJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { applyJob } } = dependencies
    return {
        execute: async (companyId: string, resume: string, userId: string, jobId: string) => {
            try {
                return await applyJob(companyId, resume, userId, jobId)
            } catch (error) {
                throw error
            }
        }
    }
}
