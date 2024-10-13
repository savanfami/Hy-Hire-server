// import { getalljobInterface } from "utils/types/types";

import mongoose from "mongoose"
import { userModel } from "../model/userMode"
import { JobsWithDetails } from "utils/types/types";


export const getSavedJobs = async (userId: string): Promise<JobsWithDetails | null> => {
  try {
    const id = new mongoose.Types.ObjectId(userId);
    const savedjobDetails = await userModel.aggregate([
      {
        $match: {
          _id: id
        }
      },
      {
        $lookup: {
          from: 'jobs',
          localField: 'savedJobs',
          foreignField: '_id',
          as: 'jobDetails'
        }
      },
      {
        $unwind: '$jobDetails'
      },
      {
        $match: {
          'jobDetails.expired': false 
        }
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'jobDetails.companyId',
          foreignField: '_id',
          as: 'companyDetails'
        }
      },
      {
        $unwind: '$companyDetails'
      },

      {
        $project: {
          _id: '$jobDetails._id',
          jobTitle: '$jobDetails.jobTitle',
          employmentType: '$jobDetails.employmentType',
          joblocation: '$jobDetails.joblocation',
          salaryMin: '$jobDetails.salaryMin',
          salaryMax: '$jobDetails.salaryMax',
          endDate: '$jobDetails.endDate',
          experience: '$jobDetails.experience',
          responsibilityInput: '$jobDetails.responsibilityInput',
          skillInput: '$jobDetails.skillInput',
          jobDescription: '$jobDetails.jobDescription',
          qualificationInput: '$jobDetails.qualificationInput',
          createdAt: '$jobDetails.createdAt',
          companyDetails: {
            _id: '$companyDetails._id',
            name: '$companyDetails.name',
            email: '$companyDetails.email',
            website: '$companyDetails.website',
            location: '$companyDetails.location',
            foundedDate: '$companyDetails.foundedDate',
            sector: '$companyDetails.sector',
            subIndustry: '$companyDetails.subIndustry',
            description: '$companyDetails.description',
            icon: '$companyDetails.icon',
            socialLinks: '$companyDetails.socialLinks'
          }
        }
      }
    ]);
    if (savedjobDetails) {
      return {
        jobsWithDetails: savedjobDetails
      }

    } else {
      return null
    }

  } catch (error: any) {
    throw new Error(error?.message);
  }
}