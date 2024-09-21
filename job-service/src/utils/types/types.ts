import { SocialLinks } from "infrastructure/database/mongo/model/companyModel";
import mongoose from "mongoose";

export interface ListJobsQuery {
    page?: string; 
    search?: string;
    companyId:string;
    itemperPage:string;
}

export interface getalljobInterface{
    _id?:mongoose.Schema.Types.ObjectId,
    jobTitle: string,
    employmentType: string,
    joblocation: string,
    salaryMin: string,
    salaryMax: string,
    endDate: Date,
    experience: string,
    responsibilityInput: string[],
    skillInput: string[],
    qualificationInput: string[],
    createdAt: Date,
    companyDetails: {
      name: string,
      email: string,
      website: string,
      location: string,
      foundedDate: Date,
      sector: string,
      subIndustry: string,
      description: string,
      icon: string,
      socialLinks: SocialLinks,
}
}