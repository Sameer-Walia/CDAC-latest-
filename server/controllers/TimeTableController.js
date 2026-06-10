import TimeTableModel from '../models/TimeTableModel.js';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs";


export const add_timetable_by_teacher = async (req, res) =>
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
}

export const fetch_all_TimeTableList_by_teacher = async (req, res) =>
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
}


export const delete_timetable_by_teacher = async (req, res) =>
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

        const filePath = path.join(__dirname, "..", "uploads", "timetable", data.TimeTable_pdf);

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
}


export const fetch_TimeTableList_added_by_me_teacher = async (req, res) =>
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
}


export const fetch_all_TimeTableList_for_student = async (req, res) =>
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
}