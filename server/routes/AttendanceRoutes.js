import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { uploadFees } from "../utils/multerConfig.js";
import { delete_attendence_by_teacher, fetch_my_attendance_acc_to_sem, fetch_unique_attendance_by_teacher, search_attendance_by_teacher, submit_Attendnace_by_teacher, update_Attendnace_by_teacher } from "../controllers/AttendanceController.js";


const router = express.Router();

router.post("/submit_Attendnace_by_teacher", verifyjsontoken, verifyteacher, submit_Attendnace_by_teacher);
router.get("/fetch_my_attendance_acc_to_sem/:batch/:course/:semester/:studentID", fetch_my_attendance_acc_to_sem);
router.post("/search_attendance_by_teacher", verifyjsontoken, verifyteacher, search_attendance_by_teacher);
router.delete("/delete_attendence_by_teacher/:aid", verifyjsontoken, verifyteacher, delete_attendence_by_teacher);
router.get("/fetch_unique_attendance_by_teacher/:aid", verifyjsontoken, verifyteacher, fetch_unique_attendance_by_teacher);
router.put("/update_Attendnace_by_teacher", verifyjsontoken, verifyteacher, update_Attendnace_by_teacher);



export default router;