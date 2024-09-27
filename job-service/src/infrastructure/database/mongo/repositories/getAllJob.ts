import { IJobFilterParams } from "utils/types/types";
import { jobModel } from "../model/jobModel";

export const getAllJobs = async (data: IJobFilterParams): Promise<any | null> => {
  try {
    console.log(data, 'Filter Data');
    const page = parseInt(data.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const matchCriteria: any = {};

    if (data.salaryUpto) {
      const salaryUpto = parseInt(data.salaryUpto);
      if (!isNaN(salaryUpto)) {
        matchCriteria.salaryMax = { $lte: salaryUpto };
      }
    }

    if (data.jobTypes && data.jobTypes.length > 0) {
      matchCriteria.employmentType = { $in: data.jobTypes };
    }

    if (data.datePosted) {
      const dateNow = new Date();
      switch (data.datePosted) {
        case 'last-24 hours':
          const last24Hours = new Date(dateNow.getTime() - 24 * 60 * 60 * 1000);
          matchCriteria.createdAt = { $gte: last24Hours };
          break;
        case 'this-week':
          const startOfWeek = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - (dateNow.getDay() + 6) % 7);
          matchCriteria.createdAt = { $gte: startOfWeek };
          break;
        case 'this-month':
          const startOfMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
          matchCriteria.createdAt = { $gte: startOfMonth };
          break;
        case 'all-time':
          matchCriteria.createdAt = { $gte: new Date(0) };
          break;
        default:
          matchCriteria.createdAt = { $gte: new Date(0) };
          break;
      }
    }


    const foundJobs = await jobModel.find(matchCriteria).skip(skip).limit(limit).sort({ createdAt: -1 });
    const count = await jobModel.find(matchCriteria).countDocuments()
    const jobIds = foundJobs.map(job => job._id);
    const jobsWithDetails = await jobModel.aggregate([
      { $match: { _id: { $in: jobIds } } },
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
          jobDescription: 1,
          qualificationInput: 1,
          createdAt: 1,
          companyDetails: {
            _id: 1,
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
      { $sort: { createdAt: -1 } }
    ]);

    //return jobwithDetails
    return {
      jobsWithDetails,
      count
    };

  } catch (error: any) {
    throw new Error(error?.message);
  }
};  
