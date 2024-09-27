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