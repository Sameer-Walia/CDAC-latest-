import mongoose from "mongoose";

const TeacherSignupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        usertype: { type: String, required: true },
        actstatus: { type: Boolean, required: true },
        token: { type: String, required: true }
    },
    {
        versionKey: false
    });


const TeacherSignupModel = mongoose.model("TeacherSignup", TeacherSignupSchema, "TeacherSignup");

export default TeacherSignupModel;