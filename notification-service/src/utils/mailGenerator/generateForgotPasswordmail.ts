import nodemailer from 'nodemailer'
import { config } from 'dotenv';
config()

export const generateForgotPasswordMail = async (email: string, url:string): Promise<void> => {
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
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            background-color: #f0f0f0;
            padding: 15px;
            text-align: center;
            font-size: 0.8em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
            <p>To reset your password, please click the button below:</p>
            <a href="${url}" class="button">Reset Password</a>
            <p>This link will expire in 10 min for security reasons.</p>
            <p>Best regards,<br>Team HY-Hire</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
        `
        
        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email, 
            subject: "Password Reset Email",
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