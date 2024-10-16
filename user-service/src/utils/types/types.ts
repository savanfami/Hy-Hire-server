import { UserEntity } from "domain/entity";
import { Schema } from "mongoose";

export enum Roles{
    User='user',
    Admin='admin',
    Company='company'
}

export interface IsearchUser{
    search:string;
    page:string|number;
}


export interface getAllUserResponse {
    data:UserEntity[],
    itemsPerPage:number,
    totalPages:number,
    totalItems:number
}

export interface ICheckSuscriptionResponse{
    isSubscribed:boolean;
    subscriptionDetails:{
        userId?: Schema.Types.ObjectId;
        stripeCustomerId?: string;
        stripeSubscriptionId?: string;
        plan?: string;
        status?: string;
        currentPeriodStart?: Date;
        currentPeriodEnd?: Date;
        cancelAtPeriodEnd?: boolean;
        amount?: number;
        isExpired?: boolean;
    }

}

export interface IGetSubscriptionResponse{
    data:{
        name:string;
        email:string;
        plan:string;
        status:string;
        currentPeriodEnd:Date;
        amount:number;
        cancellationFeedback:string;
        cancelAtPeriodEnd:boolean;
        createdAt?:Date;
    }[]
    totalAmount?:number;
}