import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name:string;
  email:string;
  password:string;
  isBlocked?:boolean;
  role?:string
//   website: String | null;
//   status: String | null;
//   password: String | null;
//   titel: String | null;
//   no_of_employees: Number | null;
//   industry: String | null;
//   foundedDate: Date | null;
//   icon: String | null;
//   name: String | null;
//   description: String | null;
//   contact: {
//   };
//   benefits: String | null;
//   location: String[] | null;
//   approvalStatus: String | null;
//   Social_links: String | null;
//   Team: String[] | null;
}

const CompanySchema: Schema = new Schema({
  name: { type: String,required:true },
  email: { type: String,required:true },
  password: { type: String,required:true },
  isBlocked:{
    default:false,
    type:Boolean
  },
  role:{type:String}
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
},{
    timestamps:true
});

export const companyModel = mongoose.model<ICompany>('company', CompanySchema);



