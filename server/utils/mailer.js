import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_UNAME,
        pass: process.env.SMTP_PASS
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000
});

export const sendMail = async (mailOptions) =>
{
    try
    {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent :", info.response);
        return true
    }
    catch (error)
    {
        console.log("Email error :", error.message);
        return false
    }
};


