import { IApplicantDetails } from "utils/types/types"
import { applicantModel } from "../model/applicantModel"
import mongoose from "mongoose"


export const getApplicantDetailsByJob=async(id:string):Promise<IApplicantDetails[]|null>=>{
    try {
        const jobId=new mongoose.Types.ObjectId(id)
        const getData = await applicantModel.aggregate([
            {
              $match: {
                jobId,
              },
            },
            {
              $lookup: {
                from: 'users', 
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            {
              $unwind: '$userDetails',
            },
            {
              $project: {
                _id: 1,
                'userDetails._id': 1,
                'userDetails.name':1,
                'userDetails.email': 1,
                'userDetails.aboutMe': 1,
                'userDetails.image': 1,
                'userDetails.location': 1,
                'userDetails.phone': 1,
                'userDetails.skills': 1,
                'userDetails.education': 1,
                'userDetails.experiences': 1,
                'userDetails.socialLinks':1,
                hiringStatus: 1,
                createdAt: 1,
                resume: 1,
                schedule:1
              },
            },
          ]);
          if(getData){
            return getData
          }else{
            return null
          }
    } catch (error:any) {
        console.log(error,'errror from aggregation appliatn details')
        throw new Error(error?.message)
    }
}