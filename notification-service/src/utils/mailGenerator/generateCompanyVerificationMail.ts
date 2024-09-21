import nodemailer from 'nodemailer'
import { config } from 'dotenv';
config()

export const generateCompanyVerificationMail = async (data): Promise<void> => {
    try {

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure: false,
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailDesign = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Company Approval Status</title>
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
        .status-container {
            text-align: center;
            margin: 30px 0;
        }
        .status-label {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
        }
        .status-label.approved {
            background-color: #2ecc71;
            color: #fff;
        }
        .status-label.rejected {
            background-color: #e74c3c;
            color: #fff;
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

        .status-label.Approved {
    color: green;
}

.status-label.Rejected {
    color: red;
}
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Company Approval Status</h1>
        <p>Dear ${data.name},</p>
        <p>We have reviewed your company's application and the status is as follows:</p>
       <div class="status-container">
        <div class="status-label ${data.status === 'Approved' ? 'Approved' : 'Rejected'}">${data.status}</div>
    </div>
        <p class="instructions">
            ${data.status === 'Approved' ? 'Your company is now approved to post jobs on Hy-Hire.' : 'Your company has been rejected. Please review the feedback and reapply when you have addressed the issues.'}
        </p>
        <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
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
            to: data.email,
            subject: "Company verification Mail",
            html: mailDesign,
        };
        transporter.verify((error: Error | null, success: boolean) => {
            if (error) {
                console.log(error, 'verification error');
            } else {
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