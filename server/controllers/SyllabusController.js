import SyllabusModel from '../models/SyllabusModel.js';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs";

export const add_syllabus_by_teacher = async (req, res) =>
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
}


export const fetch_all_syllabusList_by_teacher = async (req, res) =>
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
}

export const fetch_all_syllabusList_for_student = async (req, res) =>
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
}


export const delete_syllabus_by_teacher = async (req, res) =>
{
    try
    {
        const { sid } = req.params
        const data = await SyllabusModel.findById(sid)
        if (!data)
        {
            return res.status(404).json({ statuscode: 0, msg: "Syllabus not found" });
        }

        // const filePath = "." + `uploads/syllabus/${data.syllabus_pdf}`;
        // const filePath = `uploads/syllabus/${data.syllabus_pdf}`;

        console.log("__dirname =", __dirname);
        console.log("PDF =", data.syllabus_pdf);

        const filePath = path.join(__dirname, "..", "uploads", "syllabus", data.syllabus_pdf);

        if (fs.existsSync(filePath))
        {
            fs.unlinkSync(filePath);
        }

        const result = await SyllabusModel.deleteOne({ _id: sid });

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
}


export const fetch_syllabusList_added_by_me_teacher = async (req, res) =>
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
}