import { IDependencies } from "application/interfaces/IDependencies";
import { getUserController } from "./getUser";

export const controller=(dependencies:IDependencies)=>{
    return {
        getAllUser:getUserController(dependencies)
    }
}