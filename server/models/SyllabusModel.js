import mongoose from "mongoose";

const SyllabusSchema = new mongoose.Schema(
    {
        subjectname: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        syllabus_pdf: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        Addedon: {
            type: Date,
        },
    },
    {
        versionKey: false,
    }
);

SyllabusSchema.index({ email: 1 });

const SyllabusModel = mongoose.model("Syllabus", SyllabusSchema, "Syllabus");

export default SyllabusModel;