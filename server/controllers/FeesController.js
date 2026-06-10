import FeesUploadModel from '../models/FeesModel.js';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs";


export const upload_fees_by_student = async (req, res) =>
{
    try
    {
        const { semester, studentID, email, name, course, batch } = req.body;

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

        if (!semester?.trim() || !req.file)
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

        const newrecord = new FeesUploadModel({ name: name, email: email, studentID: studentID, batch: batch, course: course, semester: semester, fees_pdf: filePath, Addedon: currentDateIST, status: "Pending" })

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
}


export const fetch_all_fees_list_by_admin = async (req, res) =>
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
}


export const delete_1_fees_by_admin = async (req, res) =>
{
    try
    {
        const data = await FeesUploadModel.findById(req.params.fid)

        if (!data)
        {
            return res.status(404).json({ statuscode: 0, msg: "Fees Details not found" });
        }

        const filePath = path.join(__dirname, "..", "uploads", "fees", data.fees_pdf);

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
}


export const update_fees_status_by_admin = async (req, res) =>
{
    try
    {
        const { id, newStatus } = req.body;

        if (!id.trim() || !newStatus.trim())
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
}


export const fetch_sem_fees_detail_status = async (req, res) =>
{
    try
    {
        const { studentID, semester } = req.params;

        if (!semester?.trim() || !studentID?.trim())
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
}

export const fetch_feesList_acc_to_studentID_by_admin = async (req, res) =>
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
}

export const fetch_feesList_acc_to_batch_course_semester_by_admin = async (req, res) =>
{
    try
    {
        const { batch, course, sem } = req.params

        if (!batch?.trim() || !course?.trim() || !sem?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "Batch, Course and Semester All are required" });
        }

        const result = await FeesUploadModel.find({ batch: batch, course: course, semester: sem })

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
}


