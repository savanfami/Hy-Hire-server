import { ObjectId } from "mongoose";

export enum Role {
    user='user',
    admin='admin',
    company='company'
}


export interface UserEntity{
    _id?:ObjectId;
    name:string;
    email:string;
    password:string;
    confirmPassword?:string
    phone?:number;
    role?:Role;
    isBlocked?:boolean;
    otp?:string;
    createdAt?:Date
}