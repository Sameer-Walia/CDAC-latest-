import cluster from "cluster";
import os from "os";
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import nodemailer from 'nodemailer'
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import rateLimit from 'express-rate-limit';
import bcrypt from "bcrypt";
import axios from 'axios';


import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log(os.cpus().length);

if (cluster.isPrimary)
{
    const numCPUs = os.cpus().length;

    console.log(`Master process running. Forking ${numCPUs} workers`);

    for (let i = 0; i < 4; i++)
    {
        cluster.fork();
    }

    cluster.on("exit", (worker) =>
    {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });

}
else
{
    const port = 4000;
    const app = express();

    // Trust proxy (important for deployment)
    app.set("trust proxy", 1);

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // Rate Limiter
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 300, // Max requests per IP
        standardHeaders: true,
        legacyHeaders: false,

        handler: (req, res) =>
        {
            return res.status(429).json({ statuscode: 0, msg: "Too many requests. Please try again after 15 minutes." });
        }
    });

    app.use(limiter);

    // app.use(mongoSanitize());
    app.use((req, res, next) =>
    {
        if (req.body)
        {
            console.log("Before:", req.body);
            req.body = mongoSanitize.sanitize(req.body);
            console.log("After:", req.body);
        }
        if (req.params)
        {
            req.params = mongoSanitize.sanitize(req.params);
        }
        //  DO NOT reassign req.query
        if (req.query)
        {
            mongoSanitize.sanitize(req.query);
        }
        next();
    });

    function generate_Password_for_student(studentId)
    {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomPart = "";

        for (let i = 0; i < 6; i++)
        {
            randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return studentId + randomPart;
    }

    dotenv.config()

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_UNAME,
            pass: process.env.SMTP_PASS
        },
    });

    // syllabus upload
    const syllabusStorage = multer.diskStorage({
        destination: (req, file, cb) =>
        {
            cb(null, 'uploads/syllabus');
        },
        filename: (req, file, cb) =>
        {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const uploadSyllabus = multer({
        storage: syllabusStorage,
        limits: { fileSize: 3 * 1024 * 1024 },
        fileFilter: (req, file, cb) =>
        {
            if (file.mimetype === "application/pdf")
            {
                cb(null, true);
            }
            else
            {
                cb(new Error("Only PDF allowed"), false);
            }
        }
    });

    // fees upload
    const feesStorage = multer.diskStorage({
        destination: (req, file, cb) =>
        {
            cb(null, 'uploads/fees');
        },
        filename: (req, file, cb) =>
        {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const uploadFees = multer({
        storage: feesStorage,
        limits: { fileSize: 3 * 1024 * 1024 },
        fileFilter: (req, file, cb) =>
        {
            if (file.mimetype === "application/pdf")
            {
                cb(null, true);
            }
            else
            {
                cb(new Error("Only PDF allowed"), false);
            }
        }
    });

    // Time Table upload
    const TimeTableStorage = multer.diskStorage({
        destination: (req, file, cb) =>
        {
            cb(null, 'uploads/timetable');
        },
        filename: (req, file, cb) =>
        {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const uploadTimeTable = multer({
        storage: TimeTableStorage,
        limits: { fileSize: 3 * 1024 * 1024 },
        fileFilter: (req, file, cb) =>
        {
            if (file.mimetype === "application/pdf")
            {
                cb(null, true);
            }
            else
            {
                cb(new Error("Only PDF allowed"), false);
            }
        }
    });

    // thesis upload
    const thesisStorage = multer.diskStorage({
        destination: (req, file, cb) =>
        {
            cb(null, 'uploads/thesis');
        },
        filename: (req, file, cb) =>
        {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const uploadThesis = multer({
        storage: thesisStorage,
        limits: { fileSize: 3 * 1024 * 1024 },
        fileFilter: (req, file, cb) =>
        {
            if (file.mimetype === "application/pdf")
            {
                cb(null, true);
            }
            else
            {
                cb(new Error("Only PDF allowed"), false);
            }
        }
    });

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  //Allow files inside uploads/ to be opened directly via URL.

    mongoose.connect('mongodb://127.0.0.1:27017/CDAC').then(() => console.log('Connected to MongoDB'));

    const TeacherSignupSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, phone: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String, required: true }, usertype: { type: String, required: true }, actstatus: { type: Boolean, required: true }, token: { type: String, required: true } }, { versionKey: false });

    const TeacherSignupModel = mongoose.model("TeacherSignup", TeacherSignupSchema, "TeacherSignup")

    app.post("/api/add_teacher_by_admin", async (req, res) => 
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

                transporter.sendMail(mailOptions, (error, info) =>
                {
                    if (error)
                    {
                        console.log(error);
                        return res.status(200).json({ statuscode: 2, msg: "Signup Successfull , error while sending activation mail" });
                    }
                    else
                    {
                        console.log("Email sent: " + info.response);
                        return res.status(200).json({ statuscode: 1, msg: "Signup Successfull , Check your email to activate your account" });
                    }
                });
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
    })

    app.post("/api/add_teacher_by_itself", async (req, res) => 
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

                transporter.sendMail(mailOptions, (error, info) =>
                {
                    if (error)
                    {
                        console.log(error);
                        return res.status(200).json({ statuscode: 2, msg: "Signup Successfull , error while sending activation mail" });
                    }
                    else
                    {
                        console.log("Email sent: " + info.response);
                        return res.status(200).json({ statuscode: 1, msg: "Signup Successfull , Check your email to activate your account" });
                    }
                });
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
    })

    app.put("/api/activateuseraccount", async (req, res) =>
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
    })


    app.post("/api/staff_login", async (req, res) =>
    {
        try
        {
            const { email, pass } = req.body;

            // 1. Empty check
            if (!email || !pass)
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
                    return res.status(200).json({ statuscode: 1, teacherdata: result, msg: "Login Successfully" })
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
    })


    app.get("/api/fetch_all_Teachers_to_admin", async (req, res) =>
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
    })

    app.get("/api/fetch_admin_profile/:email", async (req, res) =>
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
    })

    app.get("/api/fetch_teacher_profile/:email", async (req, res) =>
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
    })


    app.get("/api/search_teacher_by_admin/:em", async (req, res) =>
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
    })

    app.get("/api/fetch_teacher_data_by_admin/:tid", async (req, res) =>
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
    })

    app.put("/api/update_teacher_by_admin", async (req, res) =>
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
    })

    app.put("/api/update_admin_profile", async (req, res) =>
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
    })


    app.put("/api/update_teacher_profile", async (req, res) =>
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
    })


    app.delete("/api/delete_teacher_by_admin/:tid", async (req, res) =>
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
    })

    app.put("/api/change_password_by_admin", async (req, res) => 
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
                        // res.clearCookie("authToken");
                        // res.clearCookie("refreshToken");
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
    })


    app.put("/api/change_password_by_teacher", async (req, res) => 
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
                        // res.clearCookie("authToken");
                        // res.clearCookie("refreshToken");
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
    })



    const StudentSignupSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, studentID: { type: String, required: true, unique: true, trim: true }, password: { type: String, required: true, trim: true }, batch: { type: String, required: true }, course: { type: String, required: true }, teacher_email: { type: String, required: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, father: { type: String, required: true, trim: true }, mother: { type: String, required: true, trim: true }, phone: { type: String, required: true, trim: true }, phone2: { type: String, required: true, trim: true }, usertype: { type: String, required: true } }, { versionKey: false });

    StudentSignupSchema.index({ teacher_email: 1 });
    StudentSignupSchema.index({ batch: 1, course: 1 });

    const StudentSignupModel = mongoose.model("StudentSignup", StudentSignupSchema, "StudentSignup")

    app.post("/api/add_student_by_admin", async (req, res) => 
    {
        try 
        {
            const { name, studentId, studentemail, batch, course, phone, fathername, mothername, phone2, email } = req.body;

            const allowedCourses = [
                "AI",
                "VLSI",
                "ES"
            ];

            if (!name || !studentId || !studentemail || !batch || !course || !phone || !fathername || !mothername || !phone2)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            if (!allowedCourses.includes(course))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid course selected" });
            }

            if (name.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
            }

            if (fathername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Father Name must be at least 3 characters" });
            }

            if (mothername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Mother Name must be at least 3 characters" });
            }

            if (!/^[0-9]{10}$/.test(phone))
            {
                return res.status(400).json({ statuscode: 0, msg: "Phone Number must be 10 digits" });
            }

            if (!/^[0-9]{10}$/.test(phone2))
            {
                return res.status(400).json({ statuscode: 0, msg: "Alternative Number must be 10 digits" });
            }

            if (!/\S+@\S+\.\S+/.test(studentemail))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
            }

            const existingUser1 = await StudentSignupModel.findOne({ email: studentemail });
            if (existingUser1)
            {
                return res.status(409).json({ statuscode: 0, msg: "Email already registered" });
            }

            const existingUser2 = await StudentSignupModel.findOne({ studentID: studentId });
            if (existingUser2)
            {
                return res.status(409).json({ statuscode: 0, msg: "Student Id already registered" });
            }

            const gen_password = generate_Password_for_student(studentId);

            const newrecord = new StudentSignupModel({ name: name, studentID: studentId, password: gen_password, phone: phone, phone2: phone2, teacher_email: email, email: studentemail, batch: batch, course: course, father: fathername, mother: mothername, usertype: "normal" })

            const result = await newrecord.save();

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "Student Added successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student not Added  successfully" });
            }
        }
        catch (e) 
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.post("/api/add_student_by_teacher", async (req, res) => 
    {
        try 
        {
            const { name, studentId, studentemail, batch, course, phone, fathername, mothername, phone2, email } = req.body;

            const allowedCourses = [
                "AI",
                "VLSI",
                "ES"
            ];

            if (!name || !studentId || !studentemail || !batch || !course || !phone || !fathername || !mothername || !phone2)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            if (!allowedCourses.includes(course))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid course selected" });
            }

            if (name.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
            }

            if (fathername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Father Name must be at least 3 characters" });
            }

            if (mothername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Mother Name must be at least 3 characters" });
            }

            if (!/^[0-9]{10}$/.test(phone))
            {
                return res.status(400).json({ statuscode: 0, msg: "Phone Number must be 10 digits" });
            }

            if (!/^[0-9]{10}$/.test(phone2))
            {
                return res.status(400).json({ statuscode: 0, msg: "Alternative Number must be 10 digits" });
            }

            if (!/\S+@\S+\.\S+/.test(studentemail))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
            }

            const existingUser1 = await StudentSignupModel.findOne({ email: studentemail });
            if (existingUser1)
            {
                return res.status(409).json({ statuscode: 0, msg: "Email already registered" });
            }

            const existingUser2 = await StudentSignupModel.findOne({ studentID: studentId });
            if (existingUser2)
            {
                return res.status(409).json({ statuscode: 0, msg: "Student Id already registered" });
            }

            const gen_password = generate_Password_for_student(studentId);

            const newrecord = new StudentSignupModel({ name: name, studentID: studentId, password: gen_password, batch: batch, course: course, phone: phone, phone2: phone2, teacher_email: email, email: studentemail, father: fathername, mother: mothername, usertype: "normal" })

            const result = await newrecord.save();

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "Student Added successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student not Added  successfully" });
            }
        }
        catch (e) 
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/fetch_all_Students_by_teacher", async (req, res) =>
    {
        try
        {
            const result = await StudentSignupModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allstudents_list: result, msg: "Students Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })



    app.get("/api/fetch_students_added_by_me/:teacheremail", async (req, res) =>
    {
        try
        {
            const result = await StudentSignupModel.find({ teacher_email: req.params.teacheremail })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, students_addedbyMe: result, msg: "Students Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.delete("/api/delete_student_by_admin/:sid", async (req, res) =>
    {
        try
        {
            const result = await StudentSignupModel.deleteOne({ _id: req.params.sid })
            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Student Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.delete("/api/delete_student_by_teacher/:sid", async (req, res) =>
    {
        try
        {
            const result = await StudentSignupModel.deleteOne({ _id: req.params.sid })
            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Student Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_student_data_by_Admin/:sid", async (req, res) =>
    {
        try
        {

            const result = await StudentSignupModel.findOne({ _id: req.params.sid })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Student Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_data: result })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/fetch_student_data_by_teacher/:sid", async (req, res) =>
    {
        try
        {

            const result = await StudentSignupModel.findOne({ _id: req.params.sid })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Student Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_data: result })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.put("/api/update_student_data_by_admin", async (req, res) =>
    {
        try
        {
            const { name, phone, phone2, batch, course, sid, fathername, mothername, studentemail } = req.body;

            const allowedCourses = [
                "AI",
                "VLSI",
                "ES"
            ];

            if (!name || !phone || !batch || !course || !phone2 || !fathername || !mothername || !studentemail)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            if (!allowedCourses.includes(course))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid course selected" });
            }

            if (name.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
            }

            if (fathername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Father Name must be at least 3 characters" });
            }

            if (mothername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Mother Name must be at least 3 characters" });
            }

            if (!/\S+@\S+\.\S+/.test(studentemail))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
            }

            if (!/^[0-9]{10}$/.test(phone))
            {
                return res.status(400).json({ statuscode: 0, msg: "Phone Number must be 10 digits" });
            }

            if (!/^[0-9]{10}$/.test(phone2))
            {
                return res.status(400).json({ statuscode: 0, msg: "Alternative Phone Number must be 10 digits" });
            }

            const result = await StudentSignupModel.updateOne({ _id: sid }, { $set: { name: name, batch: batch, course: course, phone: phone, phone2: phone2, father: fathername, mother: mothername, email: studentemail } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Student Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student Not Updated Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.put("/api/update_student_data_by_teacher", async (req, res) =>
    {
        try
        {
            const { name, batch, course, phone, phone2, sid, fathername, mothername, studentemail } = req.body;

            const allowedCourses = [
                "AI",
                "VLSI",
                "ES"
            ];

            if (!name || !phone || !batch || !course || !phone2 || !fathername || !mothername || !studentemail)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            if (!allowedCourses.includes(course))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid course selected" });
            }

            if (name.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
            }

            if (fathername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Father Name must be at least 3 characters" });
            }

            if (mothername.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Mother Name must be at least 3 characters" });
            }

            if (!/\S+@\S+\.\S+/.test(studentemail))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
            }


            if (!/^[0-9]{10}$/.test(phone))
            {
                return res.status(400).json({ statuscode: 0, msg: "Phone Number must be 10 digits" });
            }

            if (!/^[0-9]{10}$/.test(phone2))
            {
                return res.status(400).json({ statuscode: 0, msg: "Alternative Phone Number must be 10 digits" });
            }

            const result = await StudentSignupModel.updateOne({ _id: sid }, { $set: { name: name, batch: batch, course: course, phone: phone, phone2: phone2, father: fathername, mother: mothername, email: studentemail } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Student Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student Not Updated Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/search_student_by_teacher/:studentid", async (req, res) =>
    {
        try
        {

            const result = await StudentSignupModel.findOne({ studentID: req.params.studentid })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No student Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_data: result, msg: "Student Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/search_student_by_admin/:studentid", async (req, res) =>
    {
        try
        {

            const result = await StudentSignupModel.findOne({ studentID: req.params.studentid })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No student Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_data: result, msg: "Student Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/fetch_all_Students_by_admin", async (req, res) =>
    {
        try
        {
            const result = await StudentSignupModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allstudents_list: result, msg: "Students Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })



    app.get("/api/fetch_students_added_by_admin/:admin_email", async (req, res) =>
    {
        try
        {
            const result = await StudentSignupModel.find({ teacher_email: req.params.admin_email })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, students_addedbyMe: result, msg: "Students Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.post("/api/send_mail_to_student_by_admin", async (req, res) =>
    {
        try
        {
            const { name, studentpassword, studentemail, studentId } = req.body

            if (!name || !studentpassword || !studentemail || !studentId)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            if (name.trim().length < 3)
            {
                return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
            }

            if (!/\S+@\S+\.\S+/.test(studentemail))
            {
                return res.status(400).json({ statuscode: 0, msg: "Invalid email format" });
            }

            const result = await StudentSignupModel.findOne({ studentID: studentId })

            if (result === null)
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Found with this Id" })
            }
            else
            {

                const mailOptions = {
                    from: "sameerwalia13@gmail.com",
                    to: studentemail,
                    subject: 'Mail from CDAC',
                    html: `Dear ${name}<br/><br/>Thanks for Admission in CDAC .<br/><br/>Your Student id = ${studentId}<br/><br/>
                    Your Password = ${studentpassword}`
                };

                transporter.sendMail(mailOptions, (error, info) =>
                {
                    if (error)
                    {
                        console.log(error);
                        return res.status(200).json({ statuscode: 2, msg: "Mail Not Sent Successfully" })

                    }
                    else
                    {
                        console.log("Email sent: " + info.response);
                        return res.status(200).json({ statuscode: 1, msg: "Mail Sent Successfully" })
                    }
                });
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    const SyllabusSchema = new mongoose.Schema({ subjectname: { type: String, required: true, trim: true, unique: true }, syllabus_pdf: { type: String, required: true }, email: { type: String, required: true }, Addedon: { type: Date } }, { versionKey: false });

    SyllabusSchema.index({ email: 1 });

    const SyllabusModel = mongoose.model("Syllabus", SyllabusSchema, "Syllabus")

    app.post('/api/add_syllabus_by_teacher', uploadSyllabus.single('pdf'), async (req, res) =>
    {
        try
        {
            const { subjectname, email } = req.body;

            const deleteFile = () =>
            {
                if (req.file)
                {
                    // const fullPath = `uploads/syllabus/${req.file.filename}`;
                    const fullPath = path.join(__dirname, "uploads", "syllabus", req.file.filename);
                    if (fs.existsSync(fullPath))
                    {
                        fs.unlinkSync(fullPath);
                    }
                }
            };

            if (!subjectname || !req.file)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            if (subjectname.trim().length < 2)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "Name must be at least 2 characters" });
            }

            const existingSubject = await SyllabusModel.findOne({ subjectname: subjectname });
            if (existingSubject)
            {
                deleteFile();
                return res.status(409).json({ statuscode: 0, msg: "Subject already Added" });
            }

            const filePath = req.file.filename;
            // const filePath = `${req.file.filename}`;

            const currentDateUTC = new Date(); // Get the current Date in GMt/UTC
            const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
            const currentDateIST = new Date(currentDateUTC.getTime() + ISTOffset)  // convert to IST

            const newrecord = new SyllabusModel({ subjectname: subjectname, syllabus_pdf: filePath, email: email, Addedon: currentDateIST })

            const result = await newrecord.save()

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "Syllabus Added successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Syllabus not Added successfully" });
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.get("/api/fetch_all_syllabusList_by_teacher", async (req, res) =>
    {
        try
        {
            const result = await SyllabusModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Syllabus Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allsyllabus_list: result, msg: "Syllabus Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_all_syllabusList_for_student", async (req, res) =>
    {
        try
        {
            const result = await SyllabusModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Syllabus Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allsyllabus_list: result, msg: "Syllabus Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })



    app.delete("/api/delete_syllabus_by_teacher/:sid", async (req, res) =>
    {
        try
        {
            const data = await SyllabusModel.findById(req.params.sid)

            if (!data)
            {
                return res.status(404).json({ statuscode: 0, msg: "Syllabus not found" });
            }

            // const filePath = "." + `uploads/syllabus/${data.syllabus_pdf}`;
            // const filePath = `uploads/syllabus/${data.syllabus_pdf}`;

            const filePath = path.join(__dirname, "uploads", "syllabus", data.syllabus_pdf);

            if (fs.existsSync(filePath))
            {
                fs.unlinkSync(filePath);
            }

            const result = await SyllabusModel.deleteOne({ _id: req.params.sid });

            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Syllabus Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Syllabus Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_syllabusList_added_by_me_teacher/:email", async (req, res) =>
    {
        try
        {
            const result = await SyllabusModel.find({ email: req.params.email })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Syllabus Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, my_syllabus_list: result, msg: "Syllabus Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    const MarksUploadSchema = new mongoose.Schema({ studentID: { type: String, required: true, trim: true }, course: { type: String, required: true }, semester: { type: String, required: true }, subjectCode: { type: String, required: true }, obtainedMarks: { type: String, required: true }, totalMarks: { type: String, required: true }, teacher_email: { type: String, required: true }, type: { type: String, required: true } }, { versionKey: false });

    MarksUploadSchema.index({ studentID: 1 });
    MarksUploadSchema.index({ teacher_email: 1 });

    const MarksUploadModel = mongoose.model("MarksUpload", MarksUploadSchema, "MarksUpload")


    app.post('/api/add_mst_marks_by_teacher', async (req, res) =>
    {
        try
        {
            const { studentID, course, semester, subjectCode, obtainedMarks, email, type } = req.body;

            if (!studentID || !course || !semester || !subjectCode || !email || !obtainedMarks || !type)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            if (Number(obtainedMarks) > 24)
            {
                return res.status(400).json({ statuscode: 0, msg: "Obtained marks cannot be greater than total marks" });
            }

            const newrecord = new MarksUploadModel({ studentID: studentID, course: course, semester: semester, subjectCode: subjectCode, obtainedMarks: obtainedMarks, teacher_email: email, type: type, totalMarks: "24" })

            const result = await newrecord.save()

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "Marks Uploaded Successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Marks not Uploaded Successfully" });
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.get("/api/fetch_all_Students_marks_by_teacher", async (req, res) =>
    {
        try
        {
            const result = await MarksUploadModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Marks Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, students_marks_list: result, msg: "Students Marks Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_marks_by_me_teacher/:teacheremail", async (req, res) =>
    {
        try
        {
            const result = await MarksUploadModel.find({ teacher_email: req.params.teacheremail })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Marks Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, marks_addedbyMe: result, msg: "Marks Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.delete("/api/delete_marks_by_teacher/:sid", async (req, res) =>
    {
        try
        {
            const result = await MarksUploadModel.deleteOne({ _id: req.params.sid })
            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Marks Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Marks Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_marks_data_by_teacher/:mid", async (req, res) =>
    {
        try
        {

            const result = await MarksUploadModel.findOne({ _id: req.params.mid })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Marks Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_marks: result })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.put("/api/update_student_marks_by_teacher", async (req, res) =>
    {
        try
        {
            const { mid, studentID, type, course, semester, subjectCode, obtainedMarks, email } = req.body;


            if (!studentID || !type || !course || !semester || !subjectCode || !obtainedMarks || !email || !mid)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            if (Number(obtainedMarks) > 24)
            {
                return res.status(400).json({ statuscode: 0, msg: "Obtained marks cannot be greater than total marks" });
            }

            const result = await MarksUploadModel.updateOne({ _id: mid }, { $set: { studentID: studentID, course: course, semester: semester, subjectCode: subjectCode, obtainedMarks: obtainedMarks, teacher_email: email, type: type } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Marks Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Marks Not Updated Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })



    // student server starts


    app.post("/api/student_login", async (req, res) =>
    {
        try
        {
            const { studentID, pass } = req.body;

            if (!studentID || !pass)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            const result = await StudentSignupModel.findOne({ studentID: studentID, password: pass }).select("-password").select("-phone").select("-phone2").select("-father").select("-mother").select("-teacher_email")
            console.log(result)

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "Incorrect StudentID/Password" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, studentdata: result, msg: "Login Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })



    const FeesUploadSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, email: { type: String, required: true }, studentID: { type: String, required: true }, semester: { type: String, required: true }, course: { type: String, required: true }, fees_pdf: { type: String, required: true }, Addedon: { type: Date }, status: { type: String, default: "Pending", required: true } }, { versionKey: false });

    FeesUploadSchema.index({ studentID: 1 });
    FeesUploadSchema.index({ semester: 1 });
    FeesUploadSchema.index({ studentID: 1, semester: 1 });

    const FeesUploadModel = mongoose.model("FeesUpload", FeesUploadSchema, "FeesUpload")


    app.post('/api/upload_fees_by_student', uploadFees.single('pdf'), async (req, res) =>
    {
        try
        {
            const { semester, studentID, email, name, course } = req.body;

            const deleteFile = () =>
            {
                if (req.file)
                {
                    // const fullPath = `uploads/fees/${req.file.filename}`;
                    const fullPath = path.join(__dirname, "uploads", "fees", req.file.filename);
                    if (fs.existsSync(fullPath))
                    {
                        fs.unlinkSync(fullPath);
                    }
                }
            };

            if (!semester || !req.file)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            if (!req.file)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "Please select pdf" });
            }

            const filePath = req.file.filename;
            // const filePath = `${req.file.filename}`;

            const currentDateUTC = new Date(); // Get the current Date in GMt/UTC
            const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
            const currentDateIST = new Date(currentDateUTC.getTime() + ISTOffset)  // convert to IST

            const newrecord = new FeesUploadModel({ name: name, email: email, studentID: studentID, semester: semester, course: course, fees_pdf: filePath, Addedon: currentDateIST, status: "Pending" })

            const result = await newrecord.save()

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "Fees Pdf Uploaded Successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Fees Pdf not Uploaded Successfully" });
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });



    app.get("/api/fetch_all_fees_list_by_admin", async (req, res) =>
    {
        try
        {
            const result = await FeesUploadModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Fees-List Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, all_Fees_list: result, msg: "Fees-List Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.delete("/api/delete_1_fees_by_admin/:fid", async (req, res) =>
    {
        try
        {
            const data = await FeesUploadModel.findById(req.params.fid)

            if (!data)
            {
                return res.status(404).json({ statuscode: 0, msg: "Fees Details not found" });
            }

            const filePath = path.join(__dirname, "uploads", "fees", data.fees_pdf);

            if (fs.existsSync(filePath))
            {
                fs.unlinkSync(filePath);
            }

            const result = await FeesUploadModel.deleteOne({ _id: req.params.fid });

            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Fees Details Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Fees Details Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.put("/api/update_fees_status", async (req, res) =>
    {
        try
        {
            const { id, newStatus } = req.body;

            if (!id || !newStatus)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            const result = await FeesUploadModel.updateOne({ _id: id }, { $set: { status: newStatus } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Status Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Status Not Updated Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.get("/api/fetch_sem_fees_detail_status/:studentID/:semester", async (req, res) =>
    {
        try
        {
            const { studentID, semester } = req.params;

            if (!semester)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            const result = await FeesUploadModel.findOne({ studentID: studentID, semester: semester })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "Not Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, fees_status: result, msg: "Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_feesList_acc_to_studentID_by_admin", async (req, res) =>
    {
        try
        {
            const { sid } = req.query;

            if (!sid)
            {
                return res.status(400).json({ statuscode: 0, msg: "Enter Student ID" });
            }

            const result = await FeesUploadModel.find({ studentID: sid })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Fees-List Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_Fees_list: result, msg: "Fees-List Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_feesList_acc_to_semester_by_admin/:sem", async (req, res) =>
    {
        try
        {
            const { sem } = req.params

            const result = await FeesUploadModel.find({ semester: sem })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Fees-List Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, sem_Fees_list: result, msg: "Fees-List Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_my_marks_by_student/:sid", async (req, res) =>
    {
        try
        {
            const result = await MarksUploadModel.find({ studentID: req.params.sid })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Marks Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, my_marks_list: result, msg: "Students Marks Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    // student server ends


    app.get("/api/fetch_students_acc_to_batch_Course/:batch/:course", async (req, res) =>
    {
        try
        {
            const result = await StudentSignupModel.find({ batch: req.params.batch, course: req.params.course })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Students Found " })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, course_students_list: result, msg: "Students Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    const AttendanceSchema = new mongoose.Schema({
        teacherEmail: { type: String, required: true, trim: true }, batch: { type: String, required: true, trim: true }, course: { type: String, required: true, trim: true }, semester: { type: String, required: true, trim: true }, subjectCode: { type: String, required: true, trim: true }, attendanceDate: { type: String, required: true },
        students:
            [
                {
                    studentID: { type: String, required: true, trim: true },
                    studentName: { type: String, required: true, trim: true },
                    studentEmail: { type: String, required: true, trim: true },
                    attendanceStatus: { type: String, enum: ["Present", "Absent"], required: true }
                }
            ],

    }, { versionKey: false });

    AttendanceSchema.index({ teacherEmail: 1, batch: 1, course: 1, semester: 1, subjectCode: 1, attendanceDate: 1 });
    AttendanceSchema.index({ batch: 1, course: 1, semester: 1, "students.studentID": 1 });

    const AttendanceModel = mongoose.model("Attendance", AttendanceSchema, "Attendance");


    app.post("/api/submit_Attendnace_by_teacher", async (req, res) =>
    {
        try
        {
            const { email, batch, course, semester, subjectCode, date, students } = req.body;

            if (!email || !course || !semester || !subjectCode || !date)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            if (!students || students.length === 0)
            {
                return res.status(400).json({ statuscode: 0, msg: "Students attendance not found" });
            }

            const newrecord = new AttendanceModel({ teacherEmail: email, batch: batch, course: course, semester: semester, subjectCode: subjectCode, attendanceDate: date, students: students });

            const result = await newrecord.save();

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "Attendance Submitted Successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Attendance Not Submitted Successfully" });
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });


    app.get("/api/fetch_my_attendance_acc_to_sem/:batch/:course/:semester/:studentID", async (req, res) =>
    {
        try
        {
            const { batch, course, semester, studentID } = req.params;

            const attendance = await AttendanceModel.find({ batch, course, semester, "students.studentID": studentID });

            if (attendance.length === 0)
            {
                return res.status(200).json({ statuscode: 0, msg: "No Attendance Found" });
            }

            const subjectWiseAttendance = {};

            attendance.forEach((item) =>
            {
                const student = item.students.find(
                    (s) => s.studentID === studentID
                );

                if (!student) return;

                if (!subjectWiseAttendance[item.subjectCode])
                {
                    subjectWiseAttendance[item.subjectCode] =
                    {
                        subjectCode: item.subjectCode,
                        totalClasses: 0,
                        presentCount: 0,
                        absentCount: 0
                    };
                }

                subjectWiseAttendance[item.subjectCode].totalClasses++;

                if (student.attendanceStatus === "Present")
                {
                    subjectWiseAttendance[item.subjectCode].presentCount++;
                }
                else
                {
                    subjectWiseAttendance[item.subjectCode].absentCount++;
                }
            });

            const finalData = Object.values(subjectWiseAttendance);

            return res.status(200).json({ statuscode: 1, my_attendance_list: finalData });

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.post("/api/search_attendance_by_teacher", async (req, res) =>
    {
        try
        {
            const { email, batch, course, semester, subjectCode, date } = req.body;

            if (!email || !batch || !course || !semester || !subjectCode || !date)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            const result = await AttendanceModel.find({ teacherEmail: email, batch, course, semester, subjectCode, attendanceDate: date })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Attendance Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, attendance_data: result, msg: "Attendance Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.delete("/api/delete_attendence_by_teacher/:aid", async (req, res) =>
    {
        try
        {
            const result = await AttendanceModel.deleteOne({ _id: req.params.aid })
            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Attendance Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Attendance Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_unique_attendance_by_teacher/:aid", async (req, res) =>
    {
        try
        {

            const result = await AttendanceModel.findOne({ _id: req.params.aid })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Data Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, attendance_data: result })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.put("/api/update_Attendnace_by_teacher", async (req, res) =>
    {
        try
        {
            const { email, batch, course, semester, subjectCode, date, students, aid } = req.body;

            if (!email || !batch || !course || !semester || !subjectCode || !date || !aid)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            if (!students || students.length === 0)
            {
                return res.status(400).json({ statuscode: 0, msg: "Students attendance not found" });
            }

            const result = await AttendanceModel.updateOne({ _id: aid }, { $set: { teacherEmail: email, batch: batch, course: course, semester: semester, subjectCode: subjectCode, attendanceDate: date, students: students } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Attendance Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Attendance Not Updated Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    const TimeTableSchema = new mongoose.Schema({ Course: { type: String, required: true, trim: true }, Semester: { type: String, required: true, trim: true }, TimeTable_pdf: { type: String, required: true }, Teacheremail: { type: String, required: true }, Addedon: { type: Date } }, { versionKey: false });

    TimeTableSchema.index({ Teacheremail: 1 });
    TimeTableSchema.index({ Course: 1, Semester: 1 });

    const TimeTableModel = mongoose.model("TimeTable", TimeTableSchema, "TimeTable")

    app.post('/api/add_timetable_by_teacher', uploadTimeTable.single('pdf'), async (req, res) =>
    {
        try
        {
            const { course, semester, email } = req.body;

            const deleteFile = () =>
            {
                if (req.file)
                {
                    // const fullPath = `uploads/syllabus/${req.file.filename}`;
                    const fullPath = path.join(__dirname, "uploads", "timetable", req.file.filename);
                    if (fs.existsSync(fullPath))
                    {
                        fs.unlinkSync(fullPath);
                    }
                }
            };

            if (!course || !semester || !email || !req.file)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            const existingTimeTable = await TimeTableModel.findOne({ Course: course, Semester: semester });
            if (existingTimeTable)
            {
                deleteFile();
                return res.status(409).json({ statuscode: 0, msg: "Time-Table Already Added of this Course and Semester" });
            }

            const filePath = req.file.filename;
            // const filePath = `${req.file.filename}`;

            const currentDateUTC = new Date(); // Get the current Date in GMt/UTC
            const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
            const currentDateIST = new Date(currentDateUTC.getTime() + ISTOffset)  // convert to IST

            const newrecord = new TimeTableModel({ Course: course, Semester: semester, TimeTable_pdf: filePath, Teacheremail: email, Addedon: currentDateIST })

            const result = await newrecord.save()

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "TimeTable Added successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "TimeTable not Added successfully" });
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.get("/api/fetch_all_TimeTableList_by_teacher", async (req, res) =>
    {
        try
        {
            const result = await TimeTableModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Time Table Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allTimeTable_list: result, msg: "Time-Table Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.delete("/api/delete_timetable_by_teacher/:tid", async (req, res) =>
    {
        try
        {
            const data = await TimeTableModel.findById(req.params.tid)

            if (!data)
            {
                return res.status(404).json({ statuscode: 0, msg: "Time-Table not found" });
            }

            // const filePath = "." + `uploads/syllabus/${data.syllabus_pdf}`;
            // const filePath = `uploads/syllabus/${data.syllabus_pdf}`;

            const filePath = path.join(__dirname, "uploads", "timetable", data.TimeTable_pdf);

            if (fs.existsSync(filePath))
            {
                fs.unlinkSync(filePath);
            }

            const result = await TimeTableModel.deleteOne({ _id: req.params.tid });

            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Time-Table Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Time-Table Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_TimeTableList_added_by_me_teacher/:email", async (req, res) =>
    {
        try
        {
            const result = await TimeTableModel.find({ Teacheremail: req.params.email })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Time-Table Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, my_TimeTable_list: result, msg: "Time-Table Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/fetch_all_TimeTableList_for_student", async (req, res) =>
    {
        try
        {
            const result = await TimeTableModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Syllabus Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allTimeTable_list: result, msg: "Syllabus Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    // thesis start

    const ThesisUploadSchema = new mongoose.Schema({ teacher_email: { type: String, required: true, trim: true }, teacher_name: { type: String, required: true }, thesis_title: { type: String, required: true }, description: { type: String, required: true }, month: { type: String, required: true }, thesis_pdf: { type: String, required: true }, Addedon: { type: Date }, student_batch: { type: String, required: true }, student_course: { type: String, required: true }, student_ID: { type: String, required: true }, student_name: { type: String, required: true }, status: { type: String, required: true }, remarks: { type: String, required: true } }, { versionKey: false });

    // Single indexes
    ThesisUploadSchema.index({ student_ID: 1 });
    ThesisUploadSchema.index({ teacher_email: 1 });

    // Compound indexes
    ThesisUploadSchema.index({ student_ID: 1, teacher_email: 1 });
    ThesisUploadSchema.index({ student_batch: 1, student_course: 1 });
    ThesisUploadSchema.index({ student_batch: 1, student_course: 1, teacher_email: 1 });

    const ThesisUploadModel = mongoose.model("Thesis", ThesisUploadSchema, "Thesis")

    app.get("/api/fetchTeacheremail", async (req, res) =>
    {
        try
        {
            const result = await TeacherSignupModel.find().select("name email _id");

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Data Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allteacher_email: result, msg: "Data Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.post('/api/upload_thesis_by_student', uploadThesis.single('pdf'), async (req, res) =>
    {
        try
        {
            const { teacheremail, teachername, title, description, month, batch, course, studentID, name } = req.body;

            const deleteFile = () =>
            {
                if (req.file)
                {
                    const fullPath = path.join(__dirname, "uploads", "thesis", req.file.filename);
                    if (fs.existsSync(fullPath))
                    {
                        fs.unlinkSync(fullPath);
                    }
                }
            };

            if (!teacheremail?.trim() || !teachername?.trim() || !title?.trim() || !description?.trim() || !month?.trim() || !batch?.trim() || !course?.trim() || !studentID?.trim() || !name?.trim() || !req.file)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            if (!req.file)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "Please select pdf" });
            }

            if (req.file.mimetype !== "application/pdf")
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "Only PDF files allowed" });
            }
            if (req.file.size > 3 * 1024 * 1024)
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "PDF size exceeds 3 MB" });
            }
            const allowedMonths = ["January", "February", "March", "April", "May", "June"];
            if (!allowedMonths.includes(month))
            {
                deleteFile();
                return res.status(400).json({ statuscode: 0, msg: "Invalid month selected" });
            }

            const filePath = req.file.filename;

            const currentDateUTC = new Date();
            const ISTOffset = 5.5 * 60 * 60 * 1000;
            const currentDateIST = new Date(currentDateUTC.getTime() + ISTOffset)

            const newrecord = new ThesisUploadModel({ teacher_email: teacheremail, teacher_name: teachername, thesis_title: title, description: description, month: month, thesis_pdf: filePath, Addedon: currentDateIST, student_batch: batch, student_course: course, student_ID: studentID, student_name: name, status: "Pending", remarks: "NA" })

            const result = await newrecord.save()

            if (result) 
            {
                return res.status(201).json({ statuscode: 1, msg: "Thesis Pdf Uploaded Successfully" });
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Thesis Pdf not Uploaded Successfully" });
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.get("/api/fetch_thesis_Title_by_student", async (req, res) =>
    {
        try
        {
            const result = await ThesisUploadModel.findOne({ student_ID: req.query.sid }).select("thesis_title")

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0 })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, thesis_title: result.thesis_title })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/fetch_all_thesis_by_teacher/:tid", async (req, res) =>
    {
        try
        {
            const result = await ThesisUploadModel.find({ teacher_email: req.params.tid })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allthesis_list: result, msg: "Thesis Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.delete("/api/delete_student_thesis_by_teacher/:id", async (req, res) =>
    {
        try
        {
            const result = await ThesisUploadModel.deleteOne({ _id: req.params.id })
            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Student Thesis Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student Thesis Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.put("/api/update_thesis_status_by_teacher", async (req, res) =>
    {
        try
        {
            const { id, newStatus } = req.body;

            if (!id || !newStatus)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            const result = await ThesisUploadModel.updateOne({ _id: id }, { $set: { status: newStatus } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Status Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Status Not Updated Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.get("/api/search_thesis_by_id_by_teacher/:studentid/:teacheremail", async (req, res) =>
    {
        try
        {

            const result = await ThesisUploadModel.find({ student_ID: req.params.studentid, teacher_email: req.params.teacheremail })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No student Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_thesis: result, msg: "Student Thesis Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/search_thesis_by_BatchCourse_by_teacher/:batch/:course/:teacheremail", async (req, res) =>
    {
        try
        {

            const result = await ThesisUploadModel.find({ student_batch: req.params.batch, student_course: req.params.course, teacher_email: req.params.teacheremail })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No student Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_thesis: result, msg: "Student Thesis Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/fetch_my_ThesisTable_by_student/:sid", async (req, res) =>
    {
        try
        {
            const result = await ThesisUploadModel.find({ student_ID: req.params.sid })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0 })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, mythesis_table: result })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/fetch_all_thesis_by_admin", async (req, res) =>
    {
        try
        {
            const result = await ThesisUploadModel.find()

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, allthesis_list: result, msg: "Thesis Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.delete("/api/delete_student_thesis_by_admin/:id", async (req, res) =>
    {
        try
        {
            const result = await ThesisUploadModel.deleteOne({ _id: req.params.id })
            if (result.deletedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Student Thesis Deleted Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student Thesis Not Deleted Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.put("/api/update_thesis_status_by_admin", async (req, res) =>
    {
        try
        {
            const { id, newStatus } = req.body;

            if (!id || !newStatus)
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields required" });
            }

            const result = await ThesisUploadModel.updateOne({ _id: id }, { $set: { status: newStatus } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Status Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Status Not Updated Successfully" })
            }
        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    });

    app.get("/api/search_thesis_by_id_by_admin/:studentid", async (req, res) =>
    {
        try
        {

            const result = await ThesisUploadModel.find({ student_ID: req.params.studentid })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No student Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_thesis: result, msg: "Student Thesis Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/search_thesis_by_BatchCourse_by_teacher/:batch/:course", async (req, res) =>
    {
        try
        {

            const result = await ThesisUploadModel.find({ student_batch: req.params.batch, student_course: req.params.course })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No student Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_thesis: result, msg: "Student Thesis Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })

    app.get("/api/search_thesis_by_guideemail_by_admin/:guideemail", async (req, res) =>
    {
        try
        {

            const result = await ThesisUploadModel.find({ teacher_email: req.params.guideemail })

            if (result.length === 0) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No student Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_thesis: result, msg: "Student Thesis Found Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.get("/api/fetch_student_thesis_by_Admin/:tid", async (req, res) =>
    {
        try
        {
            const result = await ThesisUploadModel.findOne({ _id: req.params.tid })

            if (result === null) 
            {
                return res.status(200).json({ statuscode: 0, msg: "No Thesis Found" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 1, student_thesis: result })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.put("/api/update_student_thesis_by_admin", async (req, res) =>
    {
        try
        {
            const { tid, title, description, remarks } = req.body;


            if (!tid?.trim() || !title?.trim() || !description?.trim() || !remarks?.trim())
            {
                return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
            }

            const result = await ThesisUploadModel.updateOne({ _id: tid }, { $set: { thesis_title: title, description: description, remarks: remarks } })

            if (result.modifiedCount === 1) 
            {
                return res.status(200).json({ statuscode: 1, msg: "Student Thesis Updated Successfully" })
            }
            else 
            {
                return res.status(200).json({ statuscode: 0, msg: "Student Thesis Not Updated Successfully" })
            }

        }
        catch (e)
        {
            console.log(e.message)
            return res.status(500).json({ statuscode: -1, msg: "Server error" })
        }
    })


    app.post("/api/resendmail", async (req, res) =>
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
    });

    app.post("/api/ContactUs", async (req, res) =>
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
    })


    const ResetPassSechema = new mongoose.Schema({ email: { type: String, required: true, trim: true }, exptime: { type: Date }, token: { type: String, required: true, trim: true } }, { versionKey: false })
    const restPassModel = mongoose.model("resetpass", ResetPassSechema, "resetpass");

    app.post("/api/forgot_password_by_teacher", async (req, res) => 
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

                const newrecord = new restPassModel({ email: teacheremail, exptime: expiretime, token: passtoken })
                const result = await newrecord.save()
                if (result)
                {
                    const mailOptions = {
                        from: 'sameerwalia13@gmail.com',
                        to: teacheremail,
                        subject: 'Reset Password Mail from CDAC',
                        html: `Dear ${user.name}<br/><br/>Click on the Following Link to Reset your Password :-.<br/><br/><a href='http://localhost:5173/reset_password_by_teacher/${passtoken}'>Reset Password<a/>`
                    };

                    transporter.sendMail(mailOptions, (error, info) =>
                    {
                        if (error)
                        {
                            console.log(error);
                            return res.status(200).json({ statuscode: 0, msg: "Error sending Mail , try again" })
                        }
                        else
                        {
                            console.log("Email sent: " + info.response);
                            return res.status(200).json({ statuscode: 1, msg: "Mail sent. Please check your email to Reset Password" })
                        }
                    });

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
    });

    app.get("/api/checktoken/:code", async (req, res) =>
    {
        const currentDateUTC = new Date();
        const ISTOffset = 5.5 * 60 * 60 * 1000;
        const currtime = new Date(currentDateUTC.getTime() + ISTOffset)
        console.log(currtime)

        const { code } = req.params;

        try
        {
            const result = await restPassModel.findOne({ token: code })
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
                        const result2 = await restPassModel.deleteOne({ token: code })
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
    })

    app.put("/api/reset_password_by_teacher", async (req, res) => 
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

            const result = await restPassModel.findOne({ token: code })
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
    })


    app.listen(port, () =>
    {
        console.log(`Server running on port ${port}`);
    });

}







































