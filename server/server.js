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
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import TeacherSignupRoutes from "./routes/TeacherSignupRoutes.js";
import StudentSignupRoutes from "./routes/StudentSignupRoutes.js";
import AttendanceRoutes from "./routes/AttendanceRoutes.js";
import FeesRoutes from "./routes/FeesRoutes.js";
import MarksRoutes from "./routes/MarksRoutes.js";
import ResetPasswordRoutes from "./routes/ResetPasswordRoutes.js";
import SyllabusRoutes from "./routes/SyllabusRoutes.js";
import ThesisRoutes from "./routes/ThesisRoutes.js";
import TimeTableRoutes from "./routes/TimeTableRoutes.js";


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
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());

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

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  //Allow files inside uploads/ to be opened directly via URL.

    mongoose.connect('mongodb://127.0.0.1:27017/CDAC').then(() => console.log('Connected to MongoDB'));

    app.use("/api", TeacherSignupRoutes)
    app.use("/api", StudentSignupRoutes)
    app.use("/api", AttendanceRoutes)
    app.use("/api", FeesRoutes)
    app.use("/api", MarksRoutes)
    app.use("/api", ResetPasswordRoutes)
    app.use("/api", SyllabusRoutes)
    app.use("/api", ThesisRoutes)
    app.use("/api", TimeTableRoutes)


    app.listen(port, () =>
    {
        console.log(`Server running on port ${port}`);
    });

}







































