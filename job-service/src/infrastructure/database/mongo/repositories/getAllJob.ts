import { IJobFilterParams } from "utils/types/types";
import { jobModel } from "../model/jobModel";

export const getAllJobs = async (data: IJobFilterParams): Promise<any> => {
  try {
    const page = parseInt(data.page as string) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const matchCriteria: any = {
      expired:false
    };

    if (data.jobname?.trim() || data.location?.trim()) {
      const jobtitle = data.jobname?.trim() || '';
      const location = data.location?.trim() || '';

      matchCriteria.$or = [
        { jobTitle: { $regex: jobtitle, $options: 'i' } },
        { joblocation: { $regex: location, $options: 'i' } },
      ];

      if (jobtitle) {
        matchCriteria.jobTitle = { $regex: jobtitle, $options: 'i' };
      }
      if (location) {
        matchCriteria.joblocation = { $regex: location, $options: 'i' };
      }
    }

    if (data.salaryUpto) {
      const salaryUpto = parseInt(data.salaryUpto as string);
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
        case 'last 24 hours':
          matchCriteria.createdAt = { $gte: new Date(dateNow.getTime() - 24 * 60 * 60 * 1000) };
          break;
        case 'This week':
          matchCriteria.createdAt = { $gte: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - (dateNow.getDay() + 6) % 7) };
          break;
        case 'This month':
          matchCriteria.createdAt = { $gte: new Date(dateNow.getFullYear(), dateNow.getMonth(), 1) };
          break;
        case 'All time':
        default:
          break;
      }
    }


    const foundJobs = await jobModel.find(matchCriteria).skip(skip).limit(limit).sort({ createdAt: -1 });

    const count = await jobModel.countDocuments(matchCriteria);

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


    return {
      jobsWithDetails,
      count
    };
  } catch (error: any) {
    console.error("Error in getAllJobs:", error);
    throw new Error(error?.message);
  }
};