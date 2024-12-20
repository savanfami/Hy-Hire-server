import mongoose, { Types } from "mongoose";

export interface ListJobsQuery {
  page?: string;
  search?: string;
  companyId: string;
  itemperPage: string;
}

export interface getalljobInterface {
  _id?: mongoose.Schema.Types.ObjectId,
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
  salaryUpto: string | null;
  jobTypes: string[] | null;
  datePosted: string | null;
  jobname?: string | null;
  location?: string | null;
}


export enum Roles {
  User = 'user',
  Admin = 'admin',
  Company = 'company'
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


export interface IEducation {
  university: string;
  course: string;
  company: string;
  year: {
    from: Date;
    to: Date;
  }
  description: string
}


export interface IExperiences {
  working: string;
  title: string;
  description: string;
  company: string;
  year: {
    from: Date;
    to: Date
  }
}


export interface IApplicantDetails {
  _id: string;
  name: string;
  email: string;
  location: string;
  phone: number;
  aboutMe: string;
  image: string;
  socialLinks?: SocialLinks;
  skills: string[];
  resume: string;
  education?: IEducation[]
  experiences: IExperiences[];
  createdAt: string;
  schedule: any
}

export interface IUpdateStatusPayload {
  applicationId: string;
  hiringStatus: string;
  interviewDate?: Date
  interviewTime?: string
  roomId?: string
}

export interface IUpdateStatusResponse {
  _id?: string;
  roomId?: string;
  hiringStatus: string;
  schedule: {
    interviewDate: Date;
    interviewTime: string;
  };
  useDetails: {
    email: string;
    name: string;
  }
  companyDetails: {
    name: string;
  }
  jobDetails: {
    jobTitle: string
  }
}

export interface IGetUserApplicationResponse {
  applications: {
    _id?: string;
    name: string;
    jobTitle: string;
    appliedDate: Date;
    hiringStatus: string
  }[];
  totalCount: number
}

export interface QueryParams {
  search?: string;
  page?: string;
}

export interface getApplicationPayload {
  userId: string;
  page: number;
  search: string;
}


export interface IChatpayload {
  senderId: string;
  recieverId: string
}

export interface ICountResponse {
  totalUsers: number;
  totalCompanies: number;
  totalJobs: number;
}

export interface IGetApplicationDetailsResponse {
  jobRole: string,
  jobType: string,
  salaryMin: string,
  salaryMax: string,
  postedDate: string,
  companyName: string,
  companyLocation: string,
  companyDescription: string,
  applicantName: string,
  skills: string[]
  resume: string
}

export interface IgetChatResponse {
  _id?: string
  lastMessage?: any
  recieverId: string
  messageSender: string;
  companyData: {
    name: string;
    icon: string;
    _id?: string;
  }
}


export interface ICreateMessagePayload {
  senderId: string;
  message?: any;
  chatId: string;
  audio?: any
  role: string
}



export interface IMessageResponse {
  _id: Types.ObjectId;
  message: string;
  senderId: Types.ObjectId;
  audio: string;
  isAudio: boolean;
  chatId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isRead?: boolean;
}


export interface IMonthlyData {
  name: string;
  users: number;
  companies: number;
  jobs: number;
  hired: number;
}

export interface IDashboardStats {
  totalUsers: number;
  totalCompanies: number;
  totalJobs: number;
  totalHired: number;
  monthlyData: IMonthlyData[];
}


export interface DashboardStatistics {
  jobsStatistics: {
    totalJobs: number;
    expiredJobs: number;
  };
  applicantsStatistics: {
    totalApplicants: number;
    todayInterviews: {
      hiringStatus: string;
      candidateName: string;
      jobTitle: string;
      interviewDate: Date;
      interviewTime: string;
      status: string;
    }[];
    applicationsByStatus: {
      _id: string;
      count: number;
    }[];
    monthlyApplications: {
      month: string;
      year: number;
      count: number;
    }[];
  };
};


export interface IUserDashboardResponse {
  totalApplications: number;
  interviewsScheduled: number;
  savedJobsCount: number;
  applicationStatusDistribution: {
    status: string;
    count: number;
  }[];
  monthlyApplications: {
    month: string;
    applications: number;
  }[];
  jobTypeApplications: {
    type: string;
    applications: number;
  }[]
  todayInterviews: {
    interviewTime: string;
    jobTitle: string;
    companyName: string;
  }[]
}

export interface IgetInterviewStatus {
  interviewTime: string;
  interviewDate: Date;
  status: string;
  roomId: string;
  reschedule?:{
    status:string;
    reason:string
  }
}

export interface IgetUserInteviewSchedules {
  schedule: {
    interviewDate: Date;
    interviewTime: string;
  },
  reschedule:{
    status?:string;
  }
  companyDetails: {
    name: string;
  },
  jobDetails: {
    jobTitle: string
  }
}


export interface IRescheduleInterviewPayload{
reason:string;
interviewId:string;
userId?:string
}


export interface IUpdateRescheduleData{
  id:string;
  newDate?:Date;
  newTime?:string;
  status:string;
} 