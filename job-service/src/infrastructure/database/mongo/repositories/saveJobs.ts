import mongoose from "mongoose";
import { userModel } from "../model/userMode"


export const saveJob=async(jobId:string,userId:string):Promise<boolean|null>=>{
    try{
        const user=await userModel.findById(userId)
        const jobIdAsObjectId = new mongoose.Types.ObjectId(jobId);
        if(user){
            const isJobSaved = user.savedJobs.includes(jobIdAsObjectId);
            if(isJobSaved){
                user.savedJobs=user.savedJobs.filter(id => id.toString() !== jobId)
                await user.save()
                return true
            }else{
                user.savedJobs.push(jobIdAsObjectId)
                await user.save() 
                return false 
            }
        }else{
            return null
        }
    }catch(error:any){
        throw new Error (error?.message)
    }
}