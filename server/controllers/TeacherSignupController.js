import TeacherSignupModel from "../models/TeacherSignupModel.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { sendMail } from "../utils/mailer.js";
import jwt from 'jsonwebtoken';


export const add_teacher_by_admin = async (req, res) => 
{
    try 
    {
        const { name, phone, email, pass } = req.body;

        // 1. Empty check
        if (!name?.trim() || !phone.trim() || !email.trim() || !pass.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        // 2. Name validation
        if (name.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
        }

        // 3. Phone validation
        if (!/^[0-9]{10}$/.test(phone))
        {
            return res.status(400).json({ statuscode: 0, msg: "Phone must be 10 digits" });
        }

        // 4. Email validation
        if (!/\S+@\S+\.\S+/.test(email))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        // 5. Password validation
        if (pass.length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Password must be at least 3 characters" });
        }

        const existingUser = await TeacherSignupModel.findOne({ email: email });
        if (existingUser)
        {
            return res.status(409).json({ statuscode: 0, msg: "Email already registered" });
        }

        const acttoken = uuidv4();
        console.log(acttoken)

        const encryp_pass = bcrypt.hashSync(pass, 10)

        const newrecord = new TeacherSignupModel({ name: name, phone: phone, email: email, password: encryp_pass, usertype: "normal", actstatus: false, token: acttoken })
        const result = await newrecord.save();
        if (result) 
        {
            const mailOptions = {
                from: 'sameerwalia13@gmail.com',
                to: email,
                subject: 'Activation Mail from CDAC',
                html: `Dear ${name}<br/><br/>Thanks for signing up on our website.<br/><br/>Click on the following link to activate your account.<br/><br/><a href='http://localhost:5173/activateaccount?code=${acttoken}'>Activate Account<a/>`
            };

            const mailresp = await sendMail(mailOptions);
            if (mailresp === true)
            {
                return res.status(200).json({ statuscode: 1, msg: "Signup Successfull , Check your email to activate your account" });
            }
            else
            {
                return res.status(200).json({ statuscode: 2, msg: "Signup Successfull , error while sending activation mail" });
            }

        }
        else 
        {
            return res.status(200).json({ statuscode: 0, msg: "Teacher not Added successfully" });
        }
    }
    catch (e) 
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const add_teacher_by_itself = async (req, res) => 
{
    try 
    {
        const { name, phone, email, pass } = req.body;

        // 1. Empty check
        if (!name?.trim() || !phone?.trim() || !email?.trim() || !pass?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        // 2. Name validation
        if (name.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
        }

        // 3. Phone validation
        if (!/^[0-9]{10}$/.test(phone))
        {
            return res.status(400).json({ statuscode: 0, msg: "Phone must be 10 digits" });
        }

        // 4. Email validation
        if (!/\S+@\S+\.\S+/.test(email))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        // 5. Password validation
        if (pass.length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Password must be at least 3 characters" });
        }

        const existingUser = await TeacherSignupModel.findOne({ email: email });
        if (existingUser)
        {
            return res.status(409).json({ statuscode: 0, msg: "Email already registered" });
        }

        const acttoken = uuidv4();
        console.log(acttoken)

        const encryp_pass = bcrypt.hashSync(pass, 10)

        const newrecord = new TeacherSignupModel({ name: name, phone: phone, email: email, password: encryp_pass, usertype: "normal", actstatus: false, token: acttoken })

        const result = await newrecord.save();
        if (result) 
        {
            const mailOptions = {
                from: 'sameerwalia13@gmail.com',
                to: email,
                subject: 'Activation Mail from CDAC',
                html: `Dear ${name}<br/><br/>Thanks for signing up on our website.<br/><br/>Click on the following link to activate your account.<br/><br/><a href='http://localhost:5173/activateaccount?code=${acttoken}'>Activate Account<a/>`
            };

            const mailresp = await sendMail(mailOptions);
            if (mailresp === true)
            {
                return res.status(200).json({ statuscode: 1, msg: "Signup Successfull , Check your email to activate your account" });
            }
            else
            {
                return res.status(200).json({ statuscode: 2, msg: "Signup Successfull , error while sending activation mail" });
            }

        }
        else 
        {
            return res.status(200).json({ statuscode: 0, msg: "Signup not successfully" });
        }
    }
    catch (e) 
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const activateuseraccount = async (req, res) =>
{
    try
    {
        const { code } = req.body
        if (!code?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "Error Occured" });
        }
        const updateresult = await TeacherSignupModel.updateOne({ token: code }, { $set: { actstatus: true } });
        if (updateresult.modifiedCount === 1) 
        {
            return res.status(200).json({ statuscode: 1, msg: "Account Activated Successfully , please login now" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 0, msg: "Account not Activated Successfully " })
        }
    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const staff_login = async (req, res) =>
{
    try
    {
        const { email, pass } = req.body;

        if (!email?.trim() || !pass?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (!/\S+@\S+\.\S+/.test(email))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        if (pass.length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Password must be at least 3 characters" });
        }

        const result = await TeacherSignupModel.findOne({ email: email }).select("-phone");
        console.log(result)

        if (result === null) 
        {
            return res.status(200).json({ statuscode: 0, msg: "Incorrect Email/Password" })
        }
        else 
        {
            if (bcrypt.compareSync(pass, result.password))
            {
                const jsontoken = jwt.sign({ id: result._id, role: result.usertype }, process.env.JWT_SKEY, { expiresIn: "15m" })

                const refreshjsontoken = jwt.sign({ id: result._id, role: result.usertype }, process.env.JWT_REFRESH_SKEY, { expiresIn: "7d" })

                res.cookie("authToken", jsontoken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 15 * 60 * 1000,
                });

                res.cookie("refreshToken", refreshjsontoken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                const respdata = { _id: result._id, name: result.name, email: result.email, usertype: result.usertype, actstatus: result.actstatus }

                return res.status(200).json({ statuscode: 1, teacherdata: respdata, msg: "Login Successfully" })
            }
            else
            {
                return res.status(200).json({ statuscode: 0, msg: "Incorrect Email/Password" })
            }
        }
    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}

export const logout = async (req, res) => 
{
    try 
    {
        res.clearCookie("authToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({ statuscode: 1 })
    }
    catch (e) 
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}

export const fetch_all_Teachers_to_admin = async (req, res) =>
{
    try
    {
        const result = await TeacherSignupModel.find()

        if (result.length === 0) 
        {
            return res.status(200).json({ statuscode: 0, msg: "No Teacher Found" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 1, allteachers_list: result, msg: "Teachers Found Successfully" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}

export const fetch_admin_profile = async (req, res) =>
{
    try
    {
        if (!/\S+@\S+\.\S+/.test(req.params.email))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        const result = await TeacherSignupModel.findOne({ email: req.params.email })

        if (result === null) 
        {
            return res.status(200).json({ statuscode: 0, msg: "No Profile Found" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 1, profile: result, msg: "Profile Found Successfully" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}

export const fetch_teacher_profile = async (req, res) =>
{
    try
    {
        if (!/\S+@\S+\.\S+/.test(req.params.email))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        const result = await TeacherSignupModel.findOne({ email: req.params.email })

        if (result === null) 
        {
            return res.status(200).json({ statuscode: 0, msg: "No Profile Found" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 1, profile: result, msg: "Profile Found Successfully" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const search_teacher_by_admin = async (req, res) =>
{
    try
    {
        if (!/\S+@\S+\.\S+/.test(req.params.em))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        const result = await TeacherSignupModel.findOne({ email: req.params.em })

        if (result === null) 
        {
            return res.status(200).json({ statuscode: 0, msg: "No Teacher Found" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 1, teacher_data: result, msg: "Teacher Found Successfully" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}

export const fetch_teacher_data_by_admin = async (req, res) =>
{
    try
    {

        const result = await TeacherSignupModel.findOne({ _id: req.params.tid })

        if (result === null) 
        {
            return res.status(200).json({ statuscode: 0, msg: "No Teacher Found" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 1, teacher_data: result })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const update_teacher_by_admin = async (req, res) =>
{
    try
    {
        const { name, phone, usertype, tid } = req.body;

        if (!name || !phone || !usertype)
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (name.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
        }

        if (!/^[0-9]{10}$/.test(phone))
        {
            return res.status(400).json({ statuscode: 0, msg: "Phone Number must be 10 digits" });
        }

        const result = await TeacherSignupModel.updateOne({ _id: tid }, { $set: { name: name, phone: phone, usertype: usertype } })

        if (result.modifiedCount === 1) 
        {
            return res.status(200).json({ statuscode: 1, msg: "Teacher Updated Successfully" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 0, msg: "Teacher Not Updated Successfully" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const update_admin_profile = async (req, res) =>
{
    try
    {
        const { name, phone, email } = req.body;

        if (!name || !phone || !email)
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (name.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
        }

        if (!/^[0-9]{10}$/.test(phone))
        {
            return res.status(400).json({ statuscode: 0, msg: "Phone Number must be 10 digits" });
        }

        const result = await TeacherSignupModel.updateOne({ email: email }, { $set: { name: name, phone: phone } })

        if (result.modifiedCount === 1) 
        {
            return res.status(200).json({ statuscode: 1, msg: "profile Updated Successfully" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 0, msg: "profile Not Updated Successfully" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const update_teacher_profile = async (req, res) =>
{
    try
    {
        const { name, phone, email } = req.body;

        if (!name?.trim() || !phone?.trim() || !email?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (name?.trim().trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
        }

        if (!/^[0-9]{10}$/.test(phone?.trim()))
        {
            return res.status(400).json({ statuscode: 0, msg: "Phone Number must be 10 digits" });
        }

        const result = await TeacherSignupModel.updateOne({ email: email }, { $set: { name: name, phone: phone } })

        if (result.modifiedCount === 1) 
        {
            return res.status(200).json({ statuscode: 1, msg: "profile Updated Successfully" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 0, msg: "profile Not Updated Successfully" })
        }

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const delete_teacher_by_admin = async (req, res) =>
{
    try
    {
        const result = await TeacherSignupModel.deleteOne({ _id: req.params.tid })
        if (result.deletedCount === 1) 
        {
            return res.status(200).json({ statuscode: 1, msg: "Teacher Deleted Successfully" })
        }
        else 
        {
            return res.status(200).json({ statuscode: 0, msg: "Teacher Not Deleted Successfully" })
        }
    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}



export const change_password_by_admin = async (req, res) => 
{
    try
    {
        const { currpass, newpass, email } = req.body
        const result = await TeacherSignupModel.findOne({ email: email })
        console.log(result)
        if (result === null)
        {
            return res.status(200).json({ statuscode: 0, msg: "No Email Found" })
        }
        else
        {
            if (bcrypt.compareSync(currpass, result.password))
            {
                const encryp_newpass = bcrypt.hashSync(newpass, 10)
                const updatepass = await TeacherSignupModel.updateOne({ email: email }, { $set: { password: encryp_newpass } })
                if (updatepass.modifiedCount === 1) 
                {
                    res.clearCookie("authToken");
                    res.clearCookie("refreshToken");
                    return res.status(200).json({ statuscode: 1, msg: "Password changed successfully" })
                }
                else 
                {
                    return res.status(200).json({ statuscode: 0, msg: "Password not changed successfully" })
                }
            }
            else
            {
                return res.status(200).json({ statuscode: 0, msg: "Current Password Incorrect" })
            }
        }
    }
    catch (e)
    {
        res.json({ statuscode: -1 })
        console.log(e.message)
    }
}


export const change_password_by_teacher = async (req, res) => 
{
    try
    {
        const { currpass, newpass, email } = req.body
        const result = await TeacherSignupModel.findOne({ email: email })
        console.log(result)
        if (result === null)
        {
            return res.status(200).json({ statuscode: 0, msg: "No Email Found" })
        }
        else
        {
            if (bcrypt.compareSync(currpass, result.password))
            {
                const encryp_newpass = bcrypt.hashSync(newpass, 10)
                const updatepass = await TeacherSignupModel.updateOne({ email: email }, { $set: { password: encryp_newpass } })
                if (updatepass.modifiedCount === 1) 
                {
                    res.clearCookie("authToken");
                    res.clearCookie("refreshToken");
                    return res.status(200).json({ statuscode: 1, msg: "Password changed successfully" })
                }
                else 
                {
                    return res.status(200).json({ statuscode: 0, msg: "Password not changed successfully" })
                }
            }
            else
            {
                return res.status(200).json({ statuscode: 0, msg: "Current Password Incorrect" })
            }
        }
    }
    catch (e)
    {
        res.json({ statuscode: -1 })
        console.log(e.message)
    }
}


export const resendmail = async (req, res) =>
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
            res.status(200).json({ statuscode: 0, msg: "Teacher not found with given email" });
        }
        else
        {

            const updateresult = await TeacherSignupModel.updateOne({ email: teacheremail }, { $set: { actstatus: false } });
            if (updateresult.modifiedCount === 1)
            {
                const mailOptions = {
                    from: 'sameerwalia13@gmail.com',
                    to: teacheremail,
                    subject: 'Activation Mail from CDAC',
                    html: `Dear ${user.name}<br/><br/>Thanks for signing up on our website.<br/><br/>Click on the following link to activate your account.<br/><br/><a href='http://localhost:5173/activateaccount?code=${user.token}'>Activate Account<a/>`
                };

                transporter.sendMail(mailOptions, (error, info) =>
                {
                    if (error)
                    {
                        console.log(error);
                        return res.status(200).json({ statuscode: 2, msg: "Activation mail not resent successfully!  , error while resending activation mail" });
                    }
                    else
                    {
                        console.log("Email sent: " + info.response);
                        return res.status(200).json({ statuscode: 1, msg: "Activation mail resent successfully! , please check your mail" });
                    }
                });
            }
            else
            {
                const mailOptions = {
                    from: 'sameerwalia13@gmail.com',
                    to: teacheremail,
                    subject: 'Activation Mail from CDAC',
                    html: `Dear ${user.name}<br/><br/>Thanks for signing up on our website.<br/><br/>Click on the following link to activate your account.<br/><br/><a href='http://localhost:5173/activateaccount?code=${user.token}'>Activate Account<a/>`
                };

                transporter.sendMail(mailOptions, (error, info) => 
                {
                    if (error)
                    {
                        console.log(error);
                        return res.status(200).json({ statuscode: 2, msg: "Activation mail not resent successfully!  , error while resending activation mail" });
                    }
                    else
                    {
                        console.log("Email sent: " + info.response);
                        return res.status(200).json({ statuscode: 1, msg: "Activation mail resent successfully! , please check your mail" });
                    }
                });
            }
        }
    }
    catch (e) 
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}


export const ContactUs = async (req, res) =>
{
    try
    {
        const { name, phone, email, message, captchaToken } = req.body

        if (!captchaToken)
        {
            return res.status(400).json({ statuscode: 0, msg: "Captcha missing" });
        }
        const verifyURL = "https://www.google.com/recaptcha/api/siteverify";

        const captchaResponse = await axios.post(
            verifyURL,
            null,
            {
                params:
                {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: captchaToken
                }
            }
        );

        if (!captchaResponse.data.success)
        {
            return res.status(400).json({ statuscode: 0, msg: "Captcha verification failed" });
        }

        if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (name?.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
        }

        if (!/^[0-9]{10}$/.test(phone))
        {
            return res.status(400).json({ statuscode: 0, msg: "Phone must be 10 digits" });
        }

        if (!/\S+@\S+\.\S+/.test(email))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
        }

        const mailOptions = {
            from: 'sameerwalia13@gmail.com',
            to: 'sameerwalia13@gmail.com',
            replyTo: email,
            subject: 'Message from website - Contact Us Page',
            html: `<b>Name:- </b>${name}<br/><b>Phone:- </b>${phone}<br/><b>Email:- </b>${email}<br/><b>Message:- </b>${message}`
        };

        transporter.sendMail(mailOptions, (error, info) =>
        {
            if (error)
            {
                console.log(error);
                return res.status(200).json({ statuscode: 0, msg: "Error sending message , try again" })
            }
            else
            {
                console.log("Email sent: " + info.response);
                return res.status(200).json({ statuscode: 1, msg: "Message submitted successfully. We will revert back in 24 hours" })
            }
        });

    }
    catch (e)
    {
        console.log(e.message)
        return res.status(500).json({ statuscode: -1, msg: "Server error" })
    }
}