import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'job' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  hiringStatus: { type: String, enum: ['in-review', 'shortlisted', 'interview', 'hired', 'rejected'], default: 'in-review' },
  resume: { type: String },
  schedule: 
    {
      interviewDate: { type: Date },
      roomId: { type: String },
      interviewTime: { type: String },
      status: { type: String, default: 'pending' },
    },

},
{ timestamps: true })

export const applicantModel = mongoose.model('applicant', applicantSchema) 