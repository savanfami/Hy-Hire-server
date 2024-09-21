import { getalljobInterface } from "utils/types/types"
import { jobModel } from "../model/jobModel"

export const getAllJobs = async ():Promise<getalljobInterface[]|null> => {
  try {
    console.log('inside get all jobs')
    const jobs = await jobModel.aggregate([
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyDetails'
        }
      },
      {
        $unwind: {
          path: '$companyDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          jobTitle: 1,
          employmentType: 1,
          joblocation: 1,
          salaryMin: 1,
          salaryMax: 1,
          endDate: 1,
          experience: 1,
          responsibilityInput: 1,
          skillInput: 1,
          jobDescription:1,
          qualificationInput: 1,
          createdAt: 1,
          companyDetails: {
            name: 1,
            email: 1,
            website: 1,
            location: 1,
            foundedDate: 1,
            sector: 1,
            subIndustry: 1,
            description: 1,
            icon: 1,
            socialLinks: 1,
          }

        }
      },
      {$sort:{createdAt:-1}
    },
    ])
    if(jobs){
      return jobs 
    }else{
      throw new Error('no jobs found')
    }
  } catch (error: any) {
    console.log(error, 'error in getalljob repo')
    throw new Error(error?.message)
  }
}