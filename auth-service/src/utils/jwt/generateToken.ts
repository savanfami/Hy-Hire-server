import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const ACCESS = String(process.env.ACCESS_TOKEN_SECRET)

export const generateToken = (payload: { _id: string, email: string, role: string, exp: number }) => {
    // console.log(ACCESS)
    try {
        return jwt.sign(payload, ACCESS)
    } catch (error) {
        throw new Error('failed to generate token')
    }
}