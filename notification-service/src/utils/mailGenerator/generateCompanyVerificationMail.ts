import nodemailer from 'nodemailer'
import { config } from 'dotenv';
import { IUpdateRequestResponse,ApprovalStatus } from './Types';
config()

export const generateCompanyVerificationMail = async (data: IUpdateRequestResponse): Promise<void> => {
    try {
 console.log(data,'datadsajlsdjlfsdjlkfdjflksdafjsdlkfsdalsfsdokljfjksdflsdafjlkasdf')
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
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f7f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #3498db;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .status-container {
            text-align: center;
            margin: 30px 0;
        }
        .status-label {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 2px;
            padding: 12px 24px;
            border-radius: 50px;
            display: inline-block;
            text-transform: uppercase;
        }
        .status-label.Approved {
            background-color: #2ecc71;
            color: #ffffff;
        }
        .status-label.Rejected {
            background-color: #e74c3c;
            color: #ffffff;
        }
        .status-label.Pending {
            background-color: #f39c12;
            color: #ffffff;
        }
        .status-label.Message {
            background-color: #3498db;
            color: #ffffff;
        }
        .reason {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 5px;
            padding: 15px;
            margin-top: 20px;
            color: #721c24;
        }
        .instructions {
            margin-top: 20px;
            font-style: italic;
            text-align: center;
        }
        .footer {
            background-color: #34495e;
            color: #ecf0f1;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
    </style>
</head>
body>
    <div class="container">
        <div class="header">
            <h1>Your Company Approval Status</h1>
        </div>
        <div class="content">
            <p>Dear ${data.name},</p>
            <p>We have reviewed your company's application and the status is as follows:</p>
            <div class="status-container">
                <div class="status-label ${data.status}">${data.status}</div>
            </div>
            ${data.status ===ApprovalStatus.REJECTED  && data.reason ? `
            <div class="reason">
                <strong>Reason for Rejection:</strong>
                <p>${data.reason}</p>
            </div>
            ` : ''}
            <p class="instructions">
                ${data.status === ApprovalStatus.APPROVED
                ? 'Congratulations! Your company is now approved to post jobs on Hy-Hire. You can start using our platform to find great talent.'
                : 'We appreciate your interest in Hy-Hire. Please review the feedback above and consider reapplying once you have addressed these issues.'
                   }
            </p>
            <p>If you have any questions or need further clarification, please don't hesitate to contact our support team.</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
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