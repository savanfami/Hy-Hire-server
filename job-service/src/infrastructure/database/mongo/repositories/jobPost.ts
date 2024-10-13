import { jobEntity } from "domain/entities";
import { jobModel } from "../model/jobModel";

export const postJob=async(data:jobEntity):Promise<jobEntity|null>=>{
    try{
 
        const job=await jobModel.create(data);
        return job as unknown as jobEntity

    }catch(error:any){
        throw new Error (error?.message)
    }
}