import {   ObjectId,Schema ,model} from "mongoose";
import bcrypt from 'bcrypt' 
import { Role } from "../../../../domain/entities/userEntity";

interface IAuth  {
    _id?:ObjectId;
    name: string,
    email: string,
    password: string,
    role: Role
    isBlocked: boolean,
    matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new Schema<IAuth>({
    name: {
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
        enum: Object.values(Role),
        default: Role.user
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


export const usermodel= model<IAuth>('auth', userSchema);
