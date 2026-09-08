import mongoose from "mongoose";

const FeesUploadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },

        studentID: {
            type: String,
            required: true,
            trim: true,
        },

        batch: {
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

        fees_pdf: {
            type: String,
            required: true,
        },

        Addedon: {
            type: Date,
        },

        status: {
            type: String,
            required: true,
            default: "Pending",
        },
    },
    {
        versionKey: false,
    }
);

FeesUploadSchema.index({ studentID: 1 });
FeesUploadSchema.index({ batch: 1, course: 1, semester: 1 });
FeesUploadSchema.index({ studentID: 1, semester: 1 });

const FeesUploadModel = mongoose.model("FeesUpload", FeesUploadSchema, "FeesUpload")

export default FeesUploadModel;