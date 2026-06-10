import mongoose from "mongoose";

const ResetPassSechema = new mongoose.Schema({ email: { type: String, required: true, trim: true }, exptime: { type: Date }, token: { type: String, required: true, trim: true } }, { versionKey: false })

const RestPassModel = mongoose.model("resetpass", ResetPassSechema, "resetpass");

export default RestPassModel;