import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { add_student_by_admin, add_student_by_teacher, delete_student_by_admin, delete_student_by_teacher, fetch_all_Students_by_admin, fetch_all_Students_by_teacher, fetch_student_data_by_Admin, fetch_student_data_by_teacher, fetch_students_acc_to_batch_Course, fetch_students_added_by_admin, fetch_students_added_by_me, search_student_by_admin, search_student_by_teacher, send_mail_to_student_by_admin, student_login, update_student_data_by_admin, update_student_data_by_teacher } from "../controllers/StudentSignupController.js";

const router = express.Router();

router.post("/student_login", student_login);
router.post("/add_student_by_admin", verifyjsontoken, verifyadmin, add_student_by_admin);
router.post("/add_student_by_teacher", verifyjsontoken, verifyteacher, add_student_by_teacher);
router.get("/fetch_all_Students_by_teacher", verifyjsontoken, verifyteacher, fetch_all_Students_by_teacher);
router.get("/fetch_students_added_by_me/:teacheremail", verifyjsontoken, verifyteacher, fetch_students_added_by_me);
router.delete("/delete_student_by_admin/:sid", verifyjsontoken, verifyadmin, delete_student_by_admin);
router.delete("/delete_student_by_teacher/:sid", verifyjsontoken, verifyteacher, delete_student_by_teacher);
router.get("/fetch_student_data_by_Admin/:sid", verifyjsontoken, verifyadmin, fetch_student_data_by_Admin);
router.get("/fetch_student_data_by_teacher/:sid", verifyjsontoken, verifyteacher, fetch_student_data_by_teacher);
router.put("/update_student_data_by_admin", verifyjsontoken, verifyadmin, update_student_data_by_admin);
router.put("/update_student_data_by_teacher", verifyjsontoken, verifyteacher, update_student_data_by_teacher);
router.get("/search_student_by_teacher/:studentid", verifyjsontoken, verifyteacher, search_student_by_teacher);
router.get("/search_student_by_admin/:studentid", verifyjsontoken, verifyadmin, search_student_by_admin);
router.get("/fetch_all_Students_by_admin", verifyjsontoken, verifyadmin, fetch_all_Students_by_admin);
router.get("/fetch_students_added_by_admin/:admin_email", verifyjsontoken, verifyadmin, fetch_students_added_by_admin);
router.get("/send_mail_to_student_by_admin", verifyjsontoken, verifyadmin, send_mail_to_student_by_admin);
router.get("/fetch_all_Students_by_admin", verifyjsontoken, verifyadmin, fetch_all_Students_by_admin);
router.get("/fetch_all_Students_by_admin", verifyjsontoken, verifyadmin, fetch_all_Students_by_admin);
router.get("/fetch_students_acc_to_batch_Course/:batch/:course", verifyjsontoken, verifyteacher, fetch_students_acc_to_batch_Course);


export default router;