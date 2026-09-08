import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { add_mst_marks_by_teacher, delete_marks_by_teacher, fetch_all_Students_marks_by_teacher, fetch_marks_by_me_teacher, fetch_marks_data_by_teacher, fetch_my_marks_by_student, update_student_marks_by_teacher } from "../controllers/MarksController.js";


const router = express.Router();

router.post("/add_mst_marks_by_teacher", verifyjsontoken, verifyteacher, add_mst_marks_by_teacher);
router.get("/fetch_all_Students_marks_by_teacher", verifyjsontoken, verifyteacher, fetch_all_Students_marks_by_teacher);
router.get("/fetch_marks_by_me_teacher/:teacheremail", verifyjsontoken, verifyteacher, fetch_marks_by_me_teacher);
router.delete("/delete_marks_by_teacher/:sid", verifyjsontoken, verifyteacher, delete_marks_by_teacher);
router.get("/fetch_marks_data_by_teacher/:mid", verifyjsontoken, verifyteacher, fetch_marks_data_by_teacher);
router.put("/update_student_marks_by_teacher", verifyjsontoken, verifyteacher, update_student_marks_by_teacher);
router.get("/fetch_my_marks_by_student/:sid", fetch_my_marks_by_student);




export default router;