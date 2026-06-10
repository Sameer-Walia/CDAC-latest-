import { sendMail } from "../utils/mailer.js";
import StudentSignupModel from '../models/StudentSignupModel.js';

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

export const add_student_by_admin = async (req, res) => 
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
}


export const add_student_by_teacher = async (req, res) => 
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
}

export const fetch_all_Students_by_teacher = async (req, res) =>
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
}


export const fetch_students_added_by_me = async (req, res) =>
{
    try
    {
        const { teacheremail } = req.params
        if (!teacheremail)
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }
        const result = await StudentSignupModel.find({ teacher_email: teacheremail })

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
}


export const delete_student_by_admin = async (req, res) =>
{
    try
    {
        const { sid } = req.params
        if (!sid)
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }
        const result = await StudentSignupModel.deleteOne({ _id: sid })
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
}

export const delete_student_by_teacher = async (req, res) =>
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
}


export const fetch_student_data_by_Admin = async (req, res) =>
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
}


export const fetch_student_data_by_teacher = async (req, res) =>
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
}


export const update_student_data_by_admin = async (req, res) =>
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
}


export const update_student_data_by_teacher = async (req, res) =>
{
    try
    {
        const { name, batch, course, phone, phone2, sid, fathername, mothername, studentemail } = req.body;

        const allowedCourses = [
            "AI",
            "VLSI",
            "ES"
        ];

        if (!name?.trim() || !phone?.trim() || !batch?.trim() || !course?.trim() || !phone2?.trim() || !fathername?.trim() || !mothername?.trim() || !studentemail?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (!allowedCourses.includes(course))
        {
            return res.status(400).json({ statuscode: 0, msg: "Invalid course selected" });
        }

        if (name?.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Name must be at least 3 characters" });
        }

        if (fathername?.trim().length < 3)
        {
            return res.status(400).json({ statuscode: 0, msg: "Father Name must be at least 3 characters" });
        }

        if (mothername?.trim().length < 3)
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
}


export const search_student_by_teacher = async (req, res) =>
{
    try
    {
        const { studentid } = req.params
        if (!studentid)
        {
            return res.status(400).json({ statuscode: 0, msg: "Student ID not found" });
        }
        const result = await StudentSignupModel.findOne({ studentID: studentid })

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
}


export const search_student_by_admin = async (req, res) =>
{
    try
    {
        const { studentid } = req.params
        if (!studentid)
        {
            return res.status(400).json({ statuscode: 0, msg: "Student ID not found" });
        }
        const result = await StudentSignupModel.findOne({ studentID: studentid })

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
}


export const fetch_all_Students_by_admin = async (req, res) =>
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
}


export const fetch_students_added_by_admin = async (req, res) =>
{
    try
    {
        const { admin_email } = req.params
        if (!admin_email)
        {
            return res.status(400).json({ statuscode: 0, msg: "Admin Email not found" });
        }
        const result = await StudentSignupModel.find({ teacher_email: admin_email })

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
}


export const send_mail_to_student_by_admin = async (req, res) =>
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
}

export const student_login = async (req, res) =>
{
    try
    {
        const { studentID, pass } = req.body;

        if (!studentID?.trim() || !pass?.trim())
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
}


export const fetch_students_acc_to_batch_Course = async (req, res) =>
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
}