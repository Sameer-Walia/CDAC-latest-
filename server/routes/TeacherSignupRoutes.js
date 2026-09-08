import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { activateuseraccount, add_teacher_by_admin, add_teacher_by_itself, change_password_by_admin, change_password_by_teacher, ContactUs, delete_teacher_by_admin, fetch_admin_profile, fetch_all_Teachers_to_admin, fetch_teacher_data_by_admin, fetch_teacher_profile, logout, resendmail, search_teacher_by_admin, staff_login, update_admin_profile, update_teacher_by_admin, update_teacher_profile } from "../controllers/TeacherSignupController.js";

const router = express.Router();

router.post("/add_teacher_by_admin", verifyjsontoken, verifyadmin, add_teacher_by_admin);
router.post("/add_teacher_by_itself", add_teacher_by_itself);
router.put("/activateuseraccount", activateuseraccount);
router.post("/staff_login", staff_login);
router.post("/logout", logout);
router.get("/fetch_all_Teachers_to_admin", verifyjsontoken, verifyadmin, fetch_all_Teachers_to_admin);
router.get("/fetch_admin_profile/:email", verifyjsontoken, verifyadmin, fetch_admin_profile);
router.get("/fetch_teacher_profile/:email", verifyjsontoken, verifyteacher, fetch_teacher_profile);
router.get("/search_teacher_by_admin/:em", verifyjsontoken, verifyadmin, search_teacher_by_admin);
router.get("/fetch_teacher_data_by_admin/:tid", verifyjsontoken, verifyadmin, fetch_teacher_data_by_admin);
router.put("/update_teacher_by_admin", verifyjsontoken, verifyadmin, update_teacher_by_admin);
router.put("/update_admin_profile", verifyjsontoken, verifyadmin, update_admin_profile);
router.put("/update_teacher_profile", verifyjsontoken, verifyteacher, update_teacher_profile);
router.delete("/delete_teacher_by_admin/:tid", verifyjsontoken, verifyadmin, delete_teacher_by_admin);
router.put("/change_password_by_admin", verifyjsontoken, verifyadmin, change_password_by_admin);
router.put("/change_password_by_teacher", verifyjsontoken, verifyteacher, change_password_by_teacher);
router.post("/resendmail", resendmail);
router.post("/ContactUs", ContactUs);


export default router;