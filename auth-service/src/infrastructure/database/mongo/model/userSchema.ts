import { Schema, model } from "mongoose";
import { UserEntity } from "domain/entities"; 

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'company', 'admin'],
        default: 'user'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    }
}, {
    timestamps: true
})

export const usermodel= model<UserEntity>('users', userSchema);
