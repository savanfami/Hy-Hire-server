import jwt from 'jsonwebtoken'

export const generateForgetToken = (
payload: {
    email: string
}) => {
    const secret = process.env.FORGOT_PASSWORD_SECRET
    console.log(secret)
    if (!secret) {
        throw new Error('token secret not found')
    }
    try {    
        return jwt.sign({payload}, secret,{expiresIn:'10m'})
    } catch (error: any) {
        throw new Error(`Failed to create token: ${error.message}`)    }
}

