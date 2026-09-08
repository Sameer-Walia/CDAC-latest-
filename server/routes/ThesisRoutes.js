import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { delete_student_thesis_by_admin, delete_student_thesis_by_teacher, fetch_all_thesis_by_admin, fetch_all_thesis_by_teacher, fetch_my_ThesisTable_by_student, fetch_student_thesis_by_Admin, fetch_student_thesis_by_Teacher, fetch_thesis_Title_by_student, fetchTeacheremail, search_thesis_by_BatchCourse_by_admin, search_thesis_by_BatchCourse_by_teacher, search_thesis_by_guideemail_by_admin, search_thesis_by_id_by_admin, search_thesis_by_id_by_teacher, update_student_thesis_by_admin, update_student_thesis_by_teacher, update_thesis_status_by_admin, update_thesis_status_by_teacher, upload_thesis_by_student } from "../controllers/ThesisController.js";
import { uploadThesis } from "../utils/multerConfig.js";

const router = express.Router();

router.get("/fetchTeacheremail", fetchTeacheremail);
router.post("/upload_thesis_by_student", uploadThesis.single('pdf'), upload_thesis_by_student);
router.get("/fetch_thesis_Title_by_student", fetch_thesis_Title_by_student);
router.get("/fetch_all_thesis_by_teacher/:tid", verifyjsontoken, verifyteacher, fetch_all_thesis_by_teacher);
router.delete("/delete_student_thesis_by_teacher/:id", verifyjsontoken, verifyteacher, delete_student_thesis_by_teacher);
router.put("/update_thesis_status_by_teacher", verifyjsontoken, verifyteacher, update_thesis_status_by_teacher);
router.get("/search_thesis_by_id_by_teacher/:studentid/:teacheremail", verifyjsontoken, verifyteacher, search_thesis_by_id_by_teacher);
router.get("/search_thesis_by_BatchCourse_by_teacher/:batch/:course/:teacheremail", verifyjsontoken, verifyteacher, search_thesis_by_BatchCourse_by_teacher);
router.get("/fetch_my_ThesisTable_by_student/:sid", fetch_my_ThesisTable_by_student);
router.get("/fetch_all_thesis_by_admin", verifyjsontoken, verifyadmin, fetch_all_thesis_by_admin);
router.delete("/delete_student_thesis_by_admin/:id", verifyjsontoken, verifyadmin, delete_student_thesis_by_admin);
router.put("/update_thesis_status_by_admin", verifyjsontoken, verifyadmin, update_thesis_status_by_admin);
router.get("/search_thesis_by_id_by_admin/:studentid", verifyjsontoken, verifyadmin, search_thesis_by_id_by_admin);
router.get("/search_thesis_by_BatchCourse_by_admin/:batch/:course", verifyjsontoken, verifyadmin, search_thesis_by_BatchCourse_by_admin);
router.get("/search_thesis_by_guideemail_by_admin/:guideemail", verifyjsontoken, verifyadmin, search_thesis_by_guideemail_by_admin);
router.get("/fetch_student_thesis_by_Admin/:tid", verifyjsontoken, verifyadmin, fetch_student_thesis_by_Admin);
router.get("/fetch_student_thesis_by_Teacher/:tid", verifyjsontoken, verifyteacher, fetch_student_thesis_by_Teacher);
router.put("/update_student_thesis_by_admin", verifyjsontoken, verifyadmin, update_student_thesis_by_admin);
router.put("/update_student_thesis_by_teacher", verifyjsontoken, verifyteacher, update_student_thesis_by_teacher);






export default router;