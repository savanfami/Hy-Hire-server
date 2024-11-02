import { IDependencies } from "application/interfaces/IDependencies";



export const getUserdashboardDataUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getUserDashboardData}}=dependencies
    return {
        execute:async(id:string)=>{
            try {
                return await getUserDashboardData(id)
            } catch (error) {
                throw error
            }
        }
    }
}