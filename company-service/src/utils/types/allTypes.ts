import { CompanyEntity } from "domain/entities";

export interface ApprovalStatus {
    type: string,
    enum: ['Approved', 'Rejected', 'Pending', 'Message']
}

export enum Approvalstatus{
  APPROVED='Approved',
  REJECTED='Rejected',
  PENDING='Pending',
  MESSAGE='Approved',
}

export interface IUpdateRequestPayload{
    reason?:string;
    status:string
}

export enum Roles{
    User='user',
    Admin='admin',
    Company='company'
}



export interface IUpdateRequestResponse{
    name:string;
    email:string;
    status:ApprovalStatus;
    reason?:string;
}

export interface ICompanySearchParams{
    name:string;
    location:string;
    page:number;
    industry:string
}

export interface IPaginatedCompaniesResponse {
    totalCompanies: number;         
    totalPages: number;             
    companies: CompanyEntity[];     
}