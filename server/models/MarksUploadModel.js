import mongoose from "mongoose";

const MarksUploadSchema = new mongoose.Schema(
    {
        studentID: {
            type: String,
            required: true,
            trim: true,
        },

        course: {
            type: String,
            required: true,
            trim: true,
        },

        semester: {
            type: String,
            required: true,
            trim: true,
        },

        subjectCode: {
            type: String,
            required: true,
            trim: true,
        },

        obtainedMarks: {
            type: Number,
            required: true,
            min: 0,
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 0,
        },

        teacher_email: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        versionKey: false,
    }
);

MarksUploadSchema.index({ studentID: 1 });
MarksUploadSchema.index({ teacher_email: 1 });

const MarksUploadModel = mongoose.model("MarksUpload", MarksUploadSchema, "MarksUpload");

export default MarksUploadModel;