import mongoose from "mongoose";

const StudentSignupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        studentID: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        batch: {
            type: String,
            required: true,
        },

        course: {
            type: String,
            required: true,
        },

        teacher_email: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        father: {
            type: String,
            required: true,
            trim: true,
        },

        mother: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        phone2: {
            type: String,
            required: true,
            trim: true,
        },

        usertype: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

StudentSignupSchema.index({ teacher_email: 1 });
StudentSignupSchema.index({ batch: 1, course: 1 });

const StudentSignupModel = mongoose.model("StudentSignup", StudentSignupSchema, "StudentSignup")

export default StudentSignupModel;