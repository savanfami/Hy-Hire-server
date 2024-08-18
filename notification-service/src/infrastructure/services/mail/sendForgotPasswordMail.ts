import { generateForgotPasswordMail } from "../../../utils/mailGenerator/generateForgotPasswordmail";

export default async (email: string, token: string) => {
    try {
        const url=`http://localhost:5173/resetPassword?token=${token}`
        await generateForgotPasswordMail(email,url)
    } catch (error) {
        console.log(error)
    }
}