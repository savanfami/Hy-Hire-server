import nodemailer from 'nodemailer'
import { config } from 'dotenv';
config()

export const generateVerificationMail = async (email: string, otp: string): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || '',
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: process.env.MAIL_EMAIL || '',
                pass: process.env.MAIL_PASSWORD || '',
            },
        });

        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email, // Use the email parameter
            subject: "Email verification using OTP",
            html: `
                <p>Hello new user, use the following OTP to verify your email:</p>
                <p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${otp}</b></p>
                <p>OTP will expire in <b>10 minute(s)</b>.</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error('Error generating verification mail', error);
        throw error; 
    }
}