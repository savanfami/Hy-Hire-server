import { IDependencies } from "application/interfaces/IDependencies";



export const getAdminDashboardDataUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getAdminDashboardData}}=dependencies
    return {
        execute:async()=>{
            try {
                return await getAdminDashboardData()
            } catch (error) {
                throw error
            }
        }
    }
}