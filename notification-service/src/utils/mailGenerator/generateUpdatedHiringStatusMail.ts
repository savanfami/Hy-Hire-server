import nodemailer from 'nodemailer'
import { config } from 'dotenv';
import { IUpdateStatusData } from './Types';
config()

export const generateApplicatonShortlistedMail = async (data: IUpdateStatusData): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: false,
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        
        const formatDate=new Date(data.schedule.interviewDate)
        const date=formatDate.toLocaleDateString('en-GB')
        const mailDesign = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Shortlisted - Video Interview Scheduled</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
        
        body {
            font-family: 'Roboto', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 20px;
        }
        .header {
            background: linear-gradient(135deg, #4a90e2, #3498db);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            padding: 30px;
        }
        .interview-details {
            background-color: #f9f9f9;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #2980b9;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Congratulations!</h1>
        </div>
        <div class="content">
            <p>Dear ${data.userDetails.name},</p>
            <p>We're excited to inform you that your application for the <strong>${data.jobDetails.jobTitle}</strong> position at <strong>${data.companyDetails.name}</strong> has been shortlisted!</p>
            <p>Your impressive qualifications and experience have caught our attention, and we're eager to learn more about you. We are scheduling a video call interview to further discuss your application and potential fit with our team.</p>
            <div class="interview-details">
                <h2>Video Interview Details:</h2>
                <p><strong>Date:</strong>${date}</p>
                <p><strong>Time:</strong> ${data.schedule.interviewTime} (Please adjust to your local time zone)</p>
                <p><strong>Platform:</strong> [Video Call Platform, e.g., Zoom, Google Meet]</p>
                <p><strong>Important:</strong> The meeting link will be shared with you on the day of the interview. Please be ready at the mentioned time and check your email for the link prior to the scheduled interview.</p>
            </div>
            <p>This video call interview will give us an opportunity to:</p>
           
           
            <p>If you need to reschedule or have any questions, please don't hesitate to reach out to us .</p>
            <p>We're looking forward to meeting you virtually and discussing how your skills align with our team's goals. Please ensure you have a stable internet connection and a quiet environment for the interview.</p>
            <p>Best regards,<br>${data.companyDetails.name}</p>
        </div>
        <div class="footer">
            This email was sent by ${data.companyDetails.name}. Please do not reply directly to this email.
        </div>
    </div>
</body>
</html>
        `

        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: data?.userDetails?.email,
            subject: "response mail",
            html: mailDesign,
        };
        transporter.verify((error: Error | null, success: boolean) => {
            if (error) {
                console.log(error, 'verification error');
            } else {
                console.log(success);
            }
        })

         await transporter.sendMail(mailOptions);
        // console.log("Email sent: ", info.response);
    } catch (error) {
        console.error('Error generating verification mail', error);
        throw error;
    }
}