import nodemailer from 'nodemailer'
import { config } from 'dotenv';
config()

export const generateVerificationMail = async (email: string, otp: string,username:string): Promise<void> => {
    try {
 
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: false,  
            auth: {
                user: process.env.MAIL_EMAIL ,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        
        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email, 
            subject: "Email verification using OTP",
            html: `
                <p>Hello <b>${username}</b> use this following OTP to verify your email in HY-Hire</p>
                <p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${otp}</b></p>
                <p>OTP will expire in <b>10 minute(s)</b>.</p>
            `,
        };
        transporter.verify((error:Error|null,success:boolean)=>{
            if(error){
                console.log(error,'verification error');
            }else{
                console.log("email ready");
                console.log(success);
            }
        })
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error('Error generating verification mail', error);
        throw error; 
    }
}