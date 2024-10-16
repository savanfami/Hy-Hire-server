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


export interface JobsWithDetails {
  jobsWithDetails: getalljobInterface[];
}


export interface IJobFilterParams {
    page: string;
    salaryUpto: string|null;
    jobTypes: string[]|null;
    datePosted: string | null;
    jobname?:string|null;
    location?:string|null;
}


export enum Roles{
    User='user',
    Admin='admin',
    Company='company'
}


export interface Job {
    _id: string;
    jobTitle: string;
    employmentType: string;
    jobDescription: string;
    jobLocation: string;
    salaryMin: number;
    salaryMax: number;
    endDate: string; 
    experience: string;
    responsibilityInput: string[];
    skillInput: string[];
    qualificationInput: string[];
    createdAt: string;
    companyDetails: CompanyDetails;
  }
  
 export interface CompanyDetails {
    _id: string;
    description: string;
    email: string;
    foundedDate: string;
    icon: string;
    location: string;
    name: string;
    sector: string;
    socialLinks: SocialLinks;
    subIndustry: string;
    website: string;
  }
  
 export interface SocialLinks {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedIn: string;
  }
  

  export interface IEducation{
    university:string;
    course:string;
    company:string;
    year:{
      from:Date;
      to:Date;
    }
    description:string
  }


export interface IExperiences{
  working:string;
  title:string;
  description:string;
  company:string;
  year:{
    from:Date;
    to:Date
  }
}
  
 
export interface IApplicantDetails{
  _id:string;
  name:string;
  email:string;
  location:string;
  phone:number;
  aboutMe:string;
  image:string;
  socialLinks?:SocialLinks;
  skills:string[];
  resume:string;
  education?:IEducation[]
  experiences:IExperiences[];
  createdAt:string;
}

export interface IUpdateStatusPayload{
  applicationId: string; 
  hiringStatus: string;
  interviewDate?: Date 
  interviewTime?:string
}

export interface IUpdateStatusResponse{
  _id?:string;
  hiringStatus:string;
  schedule:{
    interviewDate:Date;
    interviewTime:string;
  };
  useDetails:{
    email:string;
    name:string;
  }
  companyDetails:{
    name:string;
  }
  jobDetails:{
    jobTitle:string
  }
}

export interface IGetUserApplicationResponse{
  applications:{
    _id?:string;
    name:string;
    jobTitle:string;
    appliedDate:Date;
    hiringStatus:string
  }[];
  totalCount:number
}

export interface QueryParams {
  search?: string;
  page?: string;
}

export interface getApplicationPayload{
  userId:string;
  page:number;
  search:string;
}


export interface IChatpayload{
  sender:string;
  reciever:string
}