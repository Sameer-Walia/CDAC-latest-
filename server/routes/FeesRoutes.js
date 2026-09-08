import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { delete_1_fees_by_admin, fetch_all_fees_list_by_admin, fetch_feesList_acc_to_batch_course_semester_by_admin, fetch_feesList_acc_to_studentID_by_admin, fetch_sem_fees_detail_status, update_fees_status_by_admin, upload_fees_by_student } from "../controllers/FeesController.js";
import { uploadFees } from "../utils/multerConfig.js";


const router = express.Router();

router.post("/upload_fees_by_student", uploadFees.single('pdf'), upload_fees_by_student);
router.get("/fetch_all_fees_list_by_admin", verifyjsontoken, verifyadmin, fetch_all_fees_list_by_admin);
router.delete("/delete_1_fees_by_admin/:fid", verifyjsontoken, verifyadmin, delete_1_fees_by_admin);
router.put("/update_fees_status_by_admin", verifyjsontoken, verifyadmin, update_fees_status_by_admin);
router.get("/fetch_sem_fees_detail_status/:studentID/:semester", fetch_sem_fees_detail_status);
router.get("/fetch_feesList_acc_to_studentID_by_admin", verifyjsontoken, verifyadmin, fetch_feesList_acc_to_studentID_by_admin);
router.get("/fetch_feesList_acc_to_batch_course_semester_by_admin/:batch/:course/:sem", verifyjsontoken, verifyadmin, fetch_feesList_acc_to_batch_course_semester_by_admin);






export default router;