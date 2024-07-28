import { ObjectId } from "mongoose";

enum Role {
    user='user',
    admin='admin',
    company='company'
}


export interface UserEntity{
    _id?:ObjectId;
    username:string;
    email:string;
    password:string;
    confirmPassword:string
    phone?:number;
    role:Role;
    isBlocked?:boolean;
    otp?:string;
    createdAt:Date
}