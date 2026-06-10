import express from "express";
import { verifyadmin, verifyjsontoken, verifyteacher } from "../utils/auth.js";
import { uploadTimeTable } from "../utils/multerConfig.js";
import { add_timetable_by_teacher, delete_timetable_by_teacher, fetch_all_TimeTableList_by_teacher, fetch_all_TimeTableList_for_student, fetch_TimeTableList_added_by_me_teacher } from "../controllers/TimeTableController.js";


const router = express.Router();

router.post("/add_timetable_by_teacher", verifyjsontoken, verifyteacher, uploadTimeTable.single('pdf'), add_timetable_by_teacher);
router.get("/fetch_all_TimeTableList_by_teacher", verifyjsontoken, verifyteacher, fetch_all_TimeTableList_by_teacher);
router.delete("/delete_timetable_by_teacher/:tid", verifyjsontoken, verifyteacher, delete_timetable_by_teacher);
router.get("/fetch_TimeTableList_added_by_me_teacher/:email", verifyjsontoken, verifyteacher, fetch_TimeTableList_added_by_me_teacher);
router.get("/fetch_all_TimeTableList_for_student", fetch_all_TimeTableList_for_student);


export default router;