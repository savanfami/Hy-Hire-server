import mongoose from "mongoose";

export interface CompanyEntity{
    _id?:mongoose.Schema.Types.ObjectId
    name?:string;
    email?:string;
    password?:string;
    isBlocked?:boolean;
    description?:string;
    contact?:string;
    location?:string;
    foundedDate?:Date;
    subIndustry?:string
    website?:string;
    icon?:string;
    sector?:string;
    socialLinks?:SocialLinks;
}

 interface SocialLinks {
    instagram?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedIn?: string | null;
  }