import mongoose, { Schema } from "mongoose";



const userSchema = new Schema({
  _id:mongoose.Types.ObjectId,
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  location: { type: String, default: '' },
  image: { type: String, default: '' },
  phone: { type: String, default: '' },
  aboutMe: { type: String, default: '' },
  experiences: [
    {
      working: { type: Boolean },
      title: { type: String },
      description: { type: String },
      company: { type: String },
      year: { from: Date, to: Date },
    }
  ],
  education: [
    {
      university: String,
      course: String,
      company: String,
      year: { from: Date, to: Date },
      description: String,
    },
  ],
  skills: { type: [String], default: [] },
  socialLinks: {
    Instagram: {
      type: String,
      default: null,
    },
    Twitter: {
      type: String,
      default: null,
    },
    LinkedIn: {
      type: String,
      default: null,
    },
  },
  resumes: { type: [String] },
  profileCompleted: { type: Boolean, default: false }
},
  {
    timestamps: true
  }

)


export const userModel = mongoose.model('user', userSchema)