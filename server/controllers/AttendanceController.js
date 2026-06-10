import AttendanceModel from '../models/AttendanceModel.js';


export const submit_Attendnace_by_teacher = async (req, res) =>
{
    try
    {
        const { email, batch, course, semester, subjectCode, date, students } = req.body;

        if (!email?.trim() || !course?.trim() || !semester?.trim() || !subjectCode?.trim() || !date?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (!students?.trim() || students?.trim().length === 0)
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
}

export const fetch_my_attendance_acc_to_sem = async (req, res) =>
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
}


export const search_attendance_by_teacher = async (req, res) =>
{
    try
    {
        const { email, batch, course, semester, subjectCode, date } = req.body;

        if (!email?.trim() || !batch?.trim() || !course?.trim() || !semester?.trim() || !subjectCode?.trim() || !date?.trim())
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
}


export const delete_attendence_by_teacher = async (req, res) =>
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
}

export const fetch_unique_attendance_by_teacher = async (req, res) =>
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
}


export const update_Attendnace_by_teacher = async (req, res) =>
{
    try
    {
        const { email, batch, course, semester, subjectCode, date, students, aid } = req.body;

        if (!email?.trim() || !batch?.trim() || !course?.trim() || !semester?.trim() || !subjectCode?.trim() || !date?.trim() || !aid?.trim())
        {
            return res.status(400).json({ statuscode: 0, msg: "All fields are required" });
        }

        if (!students?.trim() || students?.trim().length === 0)
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
}