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



  //   images: [{ type: String,  }],
  //   website: { type: String },
  //   Status: { type: String, enum: [ 'active', 'blocked' ] },
  //   title: { type: String },
  //   no_of_employees: { type: Number },
  //   industry: { type: String },
  //   foundedDate: { type: Date },
  //   icon: { type: String },
  //   description: { type: String },
  //   Contact: {
  //   },
  //   benefits: { type: String },
  //   location: [{ type: String,  }],
  //   approvalStatus: { type: String, enum: [ 'approved', 'rejected','pending','rejected' ],descripion:String,default:'rejected' },
  //   social_links: { type: String },
  //   team: [{ name:String,
  //     profile:String,
  //     designation:String
  //     }],
}, {
  timestamps: true
});

export const companyModel = mongoose.model<ICompany>('company', CompanySchema);



