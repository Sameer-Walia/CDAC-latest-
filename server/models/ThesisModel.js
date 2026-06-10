import mongoose from "mongoose";

const ThesisUploadSchema = new mongoose.Schema({ teacher_email: { type: String, required: true, trim: true }, teacher_name: { type: String, required: true }, thesis_title: { type: String, required: true }, description: { type: String, required: true }, month: { type: String, required: true }, thesis_pdf: { type: String, required: true }, Addedon: { type: Date }, student_batch: { type: String, required: true }, student_course: { type: String, required: true }, student_ID: { type: String, required: true }, student_name: { type: String, required: true }, status: { type: String, required: true }, remarks: { type: String, required: true } }, { versionKey: false });

// Single indexes
ThesisUploadSchema.index({ student_ID: 1 });
ThesisUploadSchema.index({ teacher_email: 1 });

// Compound indexes
ThesisUploadSchema.index({ student_ID: 1, teacher_email: 1 });
ThesisUploadSchema.index({ student_batch: 1, student_course: 1 });
ThesisUploadSchema.index({ student_batch: 1, student_course: 1, teacher_email: 1 });

const ThesisUploadModel = mongoose.model("Thesis", ThesisUploadSchema, "Thesis")

export default ThesisUploadModel;
