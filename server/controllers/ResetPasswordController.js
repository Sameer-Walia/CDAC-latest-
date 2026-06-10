import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { sendMail } from "../utils/mailer.js";
import TeacherSignupModel from '../models/TeacherSignupModel.js';
import RestPassModel from '../models/ResetPasswordModel.js';


export const forgot_password_by_teacher = async (req, res) => 
{
    try 
    {
        const { teacheremail } = req.body;

        if (!/\S+@\S+\.\S+/.test(teacheremail))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        const user = await TeacherSignupModel.findOne({ email: teacheremail });
        console.log(user)
        if (user === null) 
        {
            return res.status(200).json({ statuscode: 0, msg: "Teacher not found with given email" });
        }
        else
        {
            const passtoken = uuidv4();

            const currentDateUTC = new Date();
            const ISTOffset = 5.5 * 60 * 60 * 1000;
            const fifteenminOffset = 15 * 60 * 1000;
            const expiretime = new Date(currentDateUTC.getTime() + ISTOffset + fifteenminOffset)

            const newrecord = new RestPassModel({ email: teacheremail, exptime: expiretime, token: passtoken })
            const result = await newrecord.save()
            if (result)
            {
                const mailOptions = {
                    from: 'sameerwalia13@gmail.com',
                    to: teacheremail,
                    subject: 'Reset Password Mail from CDAC',
                    html: `Dear ${user.name}<br/><br/>Click on the Following Link to Reset your Password :-.<br/><br/><a href='http://localhost:5173/reset_password_by_teacher/${passtoken}'>Reset Password<a/><br/><br/>This Link Is Valid For 15 Minutes Only.<br/><br/>If you did not request for password reset, please ignore this email.`
                };

                const mailresp = await sendMail(mailOptions);
                if (mailresp === true)
                {
                    return res.status(200).json({ statuscode: 1, msg: "Mail sent. Please check your email to Reset Password" })
                }
                else
                {
                    return res.status(200).json({ statuscode: 0, msg: "Error sending Mail , try again" })
                }
            }
            else
            {
                return res.status(200).json({ statuscode: 0, msg: "Cannot Save Details" });
            }

        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const checktoken = async (req, res) =>
{
    const currentDateUTC = new Date();
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const currtime = new Date(currentDateUTC.getTime() + ISTOffset)
    console.log(currtime)

    const { code } = req.params;

    try
    {
        const result = await RestPassModel.findOne({ token: code })
        console.log(result)
        {
            if (result === null)
            {
                return res.status(200).json({ statuscode: 0 });
            }
            else
            {
                if (currtime < result.exptime)   // 5:20 < 5:30
                {
                    return res.status(200).json({ statuscode: 1 });
                }
                else
                {
                    // delete Token after it get expired
                    const result2 = await RestPassModel.deleteOne({ token: code })
                    if (result2.deletedCount === 1) 
                    {
                        return res.status(200).json({ statuscode: 0 });
                    }
                    else 
                    {
                        return res.status(200).json({ statuscode: 2 });
                    }
                }
            }
        }
    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const reset_password_by_teacher = async (req, res) => 
{
    try
    {
        const { newpass, code } = req.body

        if (!newpass?.trim() || !code?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (newpass.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "New Password must be at least 3 characters" });
        }

        const result = await RestPassModel.findOne({ token: code })
        console.log(result)
        if (result === null)
        {
            return res.status(200).json({ statuscode: 0 });
        }
        else
        {
            const encryp_newpass = bcrypt.hashSync(newpass, 10)
            const updatepass = await TeacherSignupModel.updateOne({ email: result.email }, { $set: { password: encryp_newpass } })
            if (updatepass.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Password Reset Successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Password Not Reset Successfully" });
            }

        }
    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const forgot_password_by_student = async (req, res) => 
{
    try 
    {
        const { studentID } = req.body;

        const mailOptions = {
            from: 'sameerwalia13@gmail.com',
            to: 'sameerwalia13@gmail.com',
            subject: 'Password Request - CDAC',
            html: `<p>Respected Sir/Madam,</p><p> My Student ID is <b>${studentID}</b>.</p><p>I have forgotten my password. Kindly send me my password again.</p><br/><p>Thank you.</p><p>Regards,<br/>CDAC Student</p>`
        };

        const mailresp = await sendMail(mailOptions);
        if (mailresp === true)
        {
            return res.status(200).json({ statuscode: 1, msg: "Mail sent successfully, We will revert back in 24 hours" })
        }
        else
        {
            return res.status(200).json({ statuscode: 0, msg: "Error sending Mail , try again" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}