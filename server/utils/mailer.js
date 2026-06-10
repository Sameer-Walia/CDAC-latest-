import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_UNAME,
        pass: process.env.SMTP_PASS
    },
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


