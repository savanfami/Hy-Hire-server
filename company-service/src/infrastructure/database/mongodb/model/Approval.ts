import mongoose, { Schema } from "mongoose";

const approvalSchema = new Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'company'
    }
})


export const approvalModel = mongoose.model('approval', approvalSchema) 