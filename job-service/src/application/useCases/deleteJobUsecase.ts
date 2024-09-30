import { IDependencies } from "application/interfaces/IDependencies";


export const deleteJobUsecase = (dependencies: IDependencies) => {
    const {repositories:{deleteJobs}}=dependencies
    return {
        execute: async (jobId: string) => {
            try {
                return await deleteJobs(jobId)
            } catch (error) {
                throw error
            }

        }
    }

}
