import mongoose, {  Schema } from "mongoose";



const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true

    }

)

export const userModel = mongoose.model('user', userSchema)