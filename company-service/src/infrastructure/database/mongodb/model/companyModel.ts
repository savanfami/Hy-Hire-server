import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  isBlocked?: boolean;
  role?: string
  website?: string
  location?: string;
  foundedDate?: Date;
  sector: string;
  subIndustry: string;
  description: string;
  icon: string
  profileCompleted: boolean
  socialLinks?: SocialLinks;
  approvalStatus?: {
    type: string,
    enum: ['Approved', 'Rejected', 'Pending', 'Message']
  },
  rejectionReason?: string;
}

export interface SocialLinks {
  instagram?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedIn?: string | null;
}

 
const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isBlocked: {
    default: false,
    type: Boolean
  },
  role: { type: String },
  website: { type: String },
  location: { type: String },
  foundedDate: { type: Date },
  sector: { type: String },
  subIndustry: { type: String },
  description: { type: String },
  icon: { type: String },
  profileCompleted: { type: Boolean, default: false },
  socialLinks: {
    instagram: {
      type: String,
      default: null,
    },
    facebook: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    linkedIn: {
      type: String,
      default: null,
    },
  },
  approvalStatus: {
    type: String,
    enum: ['Accepted', 'Rejected', 'Pending', 'Message'],
    default: 'Pending'
  },
  rejectionReason: {
    type: String,
    default:null
  },}, {
  timestamps: true
});

export const companyModel = mongoose.model<ICompany>('company', CompanySchema);



