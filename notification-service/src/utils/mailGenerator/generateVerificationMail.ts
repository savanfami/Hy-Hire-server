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

        const mailDesign=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP for Signup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
        }
        .otp-container {
            text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            border-radius: 5px;
            display: inline-block;
        }
        .instructions {
            text-align: center;
            margin-top: 20px;
            font-style: italic;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your OTP for Signup</h1>
        <p>Hello,${username}</p>
        <p>Thank you for signing up. Please use the following OTP to complete your signup with Hy-Hire:</p>
        <div class="otp-container">
            <div class="otp-code">${otp}</div>
        </div>
        <p class="instructions">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; 2024 Hy-Hire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `
        
        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email, 
            subject: "Email verification using OTP",
            html: mailDesign,
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