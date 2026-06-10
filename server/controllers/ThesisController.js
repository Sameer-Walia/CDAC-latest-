import TeacherSignupModel from '../models/TeacherSignupModel.js';
import ThesisUploadModel from '../models/ThesisModel.js';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs";

export const fetchTeacheremail = async (req, res) =>
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
}


export const upload_thesis_by_student = async (req, res) =>
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
}

export const fetch_thesis_Title_by_student = async (req, res) =>
{
    try
    {
        const { sid } = req.query;
        if (!sid)
        {
            return res.status(400).json({ statuscode: 0, msg: "Enter Student ID" });
        }
        const result = await ThesisUploadModel.findOne({ student_ID: sid }).select("thesis_title")

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
}


export const fetch_all_thesis_by_teacher = async (req, res) =>
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
}

export const delete_student_thesis_by_teacher = async (req, res) =>
{
    try
    {
        const data = await ThesisUploadModel.findById(req.params.id)

        if (!data)
        {
            return res.status(404).json({ statuscode: 0, msg: "Thesis not found" });
        }

        // const filePath = "." + `uploads/syllabus/${data.syllabus_pdf}`;
        // const filePath = `uploads/syllabus/${data.syllabus_pdf}`;

        const filePath = path.join(__dirname, "..", "uploads", "thesis", data.thesis_pdf);

        if (fs.existsSync(filePath))
        {
            fs.unlinkSync(filePath);
        }
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
}


export const update_thesis_status_by_teacher = async (req, res) =>
{
    try
    {
        const { id, newStatus } = req.body;

        if (!id?.trim() || !newStatus?.trim())
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
}

export const search_thesis_by_id_by_teacher = async (req, res) =>
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
}

export const search_thesis_by_BatchCourse_by_teacher = async (req, res) =>
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
}


export const fetch_my_ThesisTable_by_student = async (req, res) =>
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
}


export const fetch_all_thesis_by_admin = async (req, res) =>
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
}

export const delete_student_thesis_by_admin = async (req, res) =>
{
    try
    {
        const data = await ThesisUploadModel.findById(req.params.id)
        if (!data)
        {
            return res.status(404).json({ statuscode: 0, msg: "Thesis not found" });
        }

        const filePath = path.join(__dirname, "..", "uploads", "thesis", data.thesis_pdf);

        if (fs.existsSync(filePath))
        {
            fs.unlinkSync(filePath);
        }
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
}


export const update_thesis_status_by_admin = async (req, res) =>
{
    try
    {
        const { id, newStatus } = req.body;

        if (!id?.trim() || !newStatus?.trim())
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
}


export const search_thesis_by_id_by_admin = async (req, res) =>
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
}


export const search_thesis_by_BatchCourse_by_admin = async (req, res) =>
{
    try
    {
        const { batch, course } = req.params

        if (!batch?.trim() || !course?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields required" });
        }

        const result = await ThesisUploadModel.find({ student_batch: batch, student_course: course })

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
}


export const search_thesis_by_guideemail_by_admin = async (req, res) =>
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
}


export const fetch_student_thesis_by_Admin = async (req, res) =>
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
}


export const fetch_student_thesis_by_Teacher = async (req, res) =>
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
}


export const update_student_thesis_by_admin = async (req, res) =>
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
}


export const update_student_thesis_by_teacher = async (req, res) =>
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
}