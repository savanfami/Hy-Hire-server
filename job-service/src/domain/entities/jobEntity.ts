import mongoose, { ObjectId } from "mongoose";


export interface jobEntity{
    jobTitle:string;
    jobDescription:string;
    joblocation:string;
    salaryMax:number;
    salaryMin:number;
    companyId:mongoose.Schema.Types.ObjectId;
    endDate:Date;
    experience:string;
    qualificationInput:string[];
    skillInput:string[];
    responsibilityInput:string[];
    employmentType:string;
    createdAt?:Date;
    updatedAt?:Date;
    status?:boolean;
    _id?:ObjectId;
    count?:number

}

export interface JobResponse {
    jobs: jobEntity[];
    TotalJobs: number;
}