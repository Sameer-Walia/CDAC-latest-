import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { checktoken, forgot_password_by_student, forgot_password_by_teacher, reset_password_by_teacher } from "../controllers/ResetPasswordController.js";


const router = express.Router();

router.post("/forgot_password_by_teacher", forgot_password_by_teacher);
router.get("/checktoken/:code", checktoken);
router.put("/reset_password_by_teacher", reset_password_by_teacher);
router.post("/forgot_password_by_student", forgot_password_by_student);


export default router;