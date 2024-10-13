import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    jobTitle:String,
    employmentType:String,
    jobDescription:String,
    joblocation:String,
    salaryMin:Number,
    salaryMax:Number,
    endDate:Date,
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    },
    experience:String,
    responsibilityInput:[String],
    skillInput:[String],
    qualificationInput:[String],
    status:{
        type:Boolean,
        default:false
    },
    expired:{type:Boolean,default:false}
},{
    timestamps:true
})

export const jobModel=mongoose.model('job',jobSchema)