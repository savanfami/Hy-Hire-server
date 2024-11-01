export interface IUpdateRequestResponse{
    name:string;
    email:string;
    status:ApprovalStatus;
    reason?:string;
}

 export enum ApprovalStatus{
    APPROVED='Accepted',
    REJECTED='Rejected'
 }

 export interface IUpdateStatusData{
    _id?:string;
    hiringStatus:string;
    schedule:{
      interviewDate:Date;
      interviewTime:string;
      roomId?:string;
    };
    userDetails:{
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