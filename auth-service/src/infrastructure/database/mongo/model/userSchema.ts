import {  ObjectId, Schema, model } from "mongoose";
import bcrypt from 'bcrypt' 

interface IAuth  {
    _id?:ObjectId
    username: string,
    email: string,
    password: string,
    role: string
    isBlocked: boolean,
    matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new Schema<IAuth>({
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
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword=async function (enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function (next) {
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

export const usermodel= model<IAuth>('users', userSchema);
