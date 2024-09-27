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


export interface IUpdateRequestResponse{
    name:string;
    email:string;
    status:ApprovalStatus;
    reason?:string;
}