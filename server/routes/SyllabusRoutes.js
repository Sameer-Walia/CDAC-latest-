import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { add_syllabus_by_teacher, delete_syllabus_by_teacher, fetch_all_syllabusList_by_teacher, fetch_all_syllabusList_for_student, fetch_syllabusList_added_by_me_teacher } from "../controllers/SyllabusController.js";
import { uploadSyllabus } from "../utils/multerConfig.js";


const router = express.Router();

router.post("/add_syllabus_by_teacher", verifyjsontoken, verifyteacher, uploadSyllabus.single('pdf'), add_syllabus_by_teacher);
router.get("/fetch_all_syllabusList_by_teacher", verifyjsontoken, verifyteacher, fetch_all_syllabusList_by_teacher);
router.get("/fetch_all_syllabusList_for_student", fetch_all_syllabusList_for_student);
router.delete("/delete_syllabus_by_teacher/:sid", verifyjsontoken, verifyteacher, delete_syllabus_by_teacher);
router.get("/fetch_syllabusList_added_by_me_teacher/:email", verifyjsontoken, verifyteacher, fetch_syllabusList_added_by_me_teacher);




export default router;