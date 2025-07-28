"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendNotificationEmail = async (email, firstname, lastname, subject, message) => {
    try {
        const fullName = `${firstname} ${lastname}`;
        const mailOptions = {
            from: `"YourApp Support" <${process.env.EMAIL_SENDER}>`,
            to: email,
            subject,
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${subject}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              color: #333;
            }
            h2 {
              color: #007bff;
            }
            .footer {
              font-size: 0.85em;
              color: #999;
              margin-top: 30px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h2>${subject}</h2>
            <p>Hello ${fullName},</p>
            ${message}
            <p style="margin-top: 20px;">Enjoy our services!</p>
            <div class="footer">
              &copy; ${new Date().getFullYear()} YourApp. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
        };
        const info = await transporter.sendMail(mailOptions);
        return `Email sent: ${info.messageId}`;
    }
    catch (error) {
        console.error("Email sending failed:", error.message);
        throw new Error("Failed to send email.");
    }
};
exports.sendNotificationEmail = sendNotificationEmail;
