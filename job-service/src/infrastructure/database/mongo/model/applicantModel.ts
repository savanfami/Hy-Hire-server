import mongoose from "mongoose";

const applicantSchema=new mongoose.Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:'company'},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'job'},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    createdAt:{type:Date,default:Date.now},
    hiringStatus:{type:String,enum:['in-review','shortlisted','interview','hired','rejected'],default:'in-review'},
    resume:{type:String},
    schedule:[
        {
      testType:{type:String},
      date:{type:String},
      roomId:{type:String},
      time:{type:String},
      status:{type:String,default:'pending'},
      feedback:{type:String}
        }
    ],
})

export const applicantModel=mongoose.model('applicant',applicantSchema)