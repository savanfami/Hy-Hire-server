import { IDependencies } from "application/interfaces/IDependencies";



export const getCompanydashboardDataUsecase=(dependencies:IDependencies)=>{
    const {repositories:{getCompanyDashboardData}}=dependencies
    return {
        execute:async(id:string)=>{
            try {
                return await getCompanyDashboardData(id)
            } catch (error) {
                throw error
            }
        }
    }
}