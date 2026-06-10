import mongoose from "mongoose";

const TimeTableSchema = new mongoose.Schema({ Course: { type: String, required: true, trim: true }, Semester: { type: String, required: true, trim: true }, TimeTable_pdf: { type: String, required: true }, Teacheremail: { type: String, required: true }, Addedon: { type: Date } }, { versionKey: false });

TimeTableSchema.index({ Teacheremail: 1 });
TimeTableSchema.index({ Course: 1, Semester: 1 });

const TimeTableModel = mongoose.model("TimeTable", TimeTableSchema, "TimeTable")

export default TimeTableModel;
