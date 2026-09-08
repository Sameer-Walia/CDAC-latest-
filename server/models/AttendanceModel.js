import mongoose from "mongoose";

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

export default AttendanceModel;
