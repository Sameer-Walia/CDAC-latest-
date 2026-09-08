import MarksUploadModel from '../models/MarksUploadModel.js';


export const add_mst_marks_by_teacher = async (req, res) =>
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
}


export const fetch_all_Students_marks_by_teacher = async (req, res) =>
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
}


export const fetch_marks_by_me_teacher = async (req, res) =>
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
}


export const delete_marks_by_teacher = async (req, res) =>
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
}


export const fetch_marks_data_by_teacher = async (req, res) =>
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
}


export const update_student_marks_by_teacher = async (req, res) =>
{
    try
    {
        const { mid, studentID, type, course, semester, subjectCode, obtainedMarks, email } = req.body;

        if (!studentID?.trim() || !type?.trim() || !course?.trim() || !semester?.trim() || !subjectCode?.trim() || !obtainedMarks?.trim() || !email?.trim() || !mid?.trim())
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
}

export const fetch_my_marks_by_student = async (req, res) =>
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
}