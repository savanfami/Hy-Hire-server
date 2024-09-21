import mongoose, { Schema } from "mongoose";


const skillSchema=new Schema({
    name:{
        type:String,
        required:true
    }
})

export const skillmodel=mongoose.model('skill',skillSchema)
