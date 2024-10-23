import mongoose from 'mongoose';
import { IGetApplicationDetailsResponse } from 'utils/types/types';
import { applicantModel } from '../model/applicantModel';

export const getApplicationDetails = async (id: string): Promise<IGetApplicationDetailsResponse | null> => {
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const applicationDetails = await applicantModel.aggregate([
            {
                $match: { _id: objectId }
            },
            {
                $lookup: {
                    from: 'jobs', 
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            {
                $unwind: '$jobDetails'
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    as: 'companyDetails'
                }
            },
            {
                $unwind: '$companyDetails'
            },
            {
                $lookup: {
                    from: 'users', 
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'applicantDetails'
                }
            },
            {
                $unwind: '$applicantDetails'
            },
            {
                $project: {
                    _id: 0,
                    jobRole: '$jobDetails.jobTitle',
                    jobType: '$jobDetails.employmentType',
                    salaryMin: '$jobDetails.salaryMin',
                    salaryMax: '$jobDetails.salaryMax',
                    companyName: '$companyDetails.name',
                    companyLocation: '$companyDetails.location',
                    companyDescription: '$companyDetails.description',
                    applicantName: '$applicantDetails.name',
                    skills:'$jobDetails.skillInput',
                    resume:1
                }
            }
        ]);


        return applicationDetails.length > 0 ? applicationDetails[0] : null;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
