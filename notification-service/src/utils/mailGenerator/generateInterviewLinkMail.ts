import nodemailer from 'nodemailer'
import { config } from 'dotenv';
import { IUpdateStatusData } from './Types';
config()

export const generateinterviewLinkMail = async (data: IUpdateStatusData): Promise<void> => {
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
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Link</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f3f4f6;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #2563eb;
            color: #ffffff;
            padding: 32px 24px;
            text-align: center;
        }

        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .content {
            padding: 32px 24px;
        }

        .greeting {
            font-size: 18px;
            margin-bottom: 24px;
        }

        .link-box {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
        }

        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff;
            padding: 16px 40px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
            margin: 16px 0;
            text-align: center;
        }

    

        .important-note {
            background-color: #fff7ed;
            border-left: 4px solid #f97316;
            padding: 16px;
            margin: 24px 0;
            border-radius: 0 8px 8px 0;
        }

        .divider {
            height: 1px;
            background-color: #e2e8f0;
            margin: 24px 0;
        }

        .center-info {
            margin-top: 16px;
            padding: 20px;
            background-color: #f8fafc;
            border-radius: 8px;
            text-align: center;
        }

        .center-info p {
            margin: 8px 0;
            color: #64748b;
            font-size: 14px;
        }

        .footer {
            text-align: center;
            padding: 24px;
            background-color: #f8fafc;
            color: #64748b;
            font-size: 14px;
        }

        .checklist {
            background-color: #f0f9ff;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
        }

        .checklist-title {
            font-weight: 600;
            margin-bottom: 12px;
            color: #0369a1;
        }

        .checklist ul {
            list-style: none;
        }

        .checklist li {
            margin: 8px 0;
            padding-left: 24px;
            position: relative;
        }

        .checklist li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #0369a1;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Interview Link</h1>
            <p>Your video interview access link</p>
        </div>
        
        <div class="content">
            <p class="greeting">Dear <strong>${data.userDetails.name}</strong>,</p>
            
            <p>Thanks for confirming your interview with ${data.companyDetails.name}. Here's your personal link to join the video interview:</p>
            
          <div class="link-box">
    <p style="font-size: 14px; color: #64748b; margin-bottom: 12px;">
        Click the link below to join the interview:
    </p>
      <div class="link-box">
                <a href="http://${data.schedule.roomId}"  style="color: #ffffff;"  target="_blank" class="cta-button">
                    Join Interview Room
                </a>
                <p>If the button doesn’t work, try copying this link into your browser:</p>
                <p><a href="http://${data.schedule.roomId}" target="_blank">${data.schedule.roomId}</a></p>
            </div>

</div>


            <div class="important-note">
                <strong>Important:</strong> The interview link will become active 15 minutes before your scheduled interview time.
            </div>

            <div class="checklist">
                <div class="checklist-title">Quick Pre-Interview Checklist</div>
                <ul>
                    <li>Test your camera and microphone</li>
                    <li>Ensure stable internet connection</li>
                    <li>Choose a quiet, well-lit location</li>
                </ul>
            </div>

            <div class="center-info">
                <p><strong>${data.companyDetails.name}</strong></p>
            </div>
        </div>

        <div class="footer">
            <p>If you experience any technical difficulties, please contact our support team immediately.</p>
            <p>Best of luck with your interview!</p>
        </div>
    </div>
</body>
</html>`

        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: data?.userDetails?.email,
            subject: "Interview Link",
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
        console.error('Error generating interview mail', error);
        throw error;
    }
}