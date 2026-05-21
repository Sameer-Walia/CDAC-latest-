import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import AdminHome from "./Home/AdminHome";
import TeacherHome from "./Home/TeacherHome";
import StudentHome from "./Home/StudentHome";
import Authpage from "./Authpage";
import { useEffect } from "react";
import Overview from "./AboutUs/Overview";
import Recognition from "./AboutUs/Recognition";
import Departmental_Activities from "./AboutUs/Departmental_Activities";
import Holiday_List from "./AboutUs/Holiday_List";
import Contact from "./AboutUs/Contact";
import Director from "./Administration/Director";
import Rules_guide from "./Administration/Rules_guide";
import Academic_Overview from "./Academics/Academic_Overview";
import Programmes from "./Academics/Programmes";
import Mtech_Ai from "./Academics/Mtech_Ai";
import Mtech_Es from "./Academics/Mtech_Es";
import Mtech_Vlsi from "./Academics/Mtech_Vlsi";
import Academic_Calender from "./Academics/Academic_Calender";
import Syllabus from "./Academics/Syllabus";
import Fees_Structure from "./Academics/Fees_Structure";
import Procedure from "./Admissions/Procedure";
import Eligibility_criteria from "./Admissions/Eligibility_criteria";
import Admission_help from "./Admissions/Admission_help";
import Hod from "./People/Hod";
import List_of_faculty from "./People/List_of_faculty";
import Staff from "./People/Staff";
import SponsoredProjects from "./Research/SponsoredProjects";
import StudentProjects from "./Research/StudentProjects";
import Library from "./Facilities/Library";
import Laboratories from "./Facilities/Laboratories";
import Hostel from "./Facilities/Hostel";
import PoMessage from "./Placement/PoMessage";
import Placement_acsd from "./Placement/Placement_acsd";
import Contact_Po from "./Placement/Contact_Po";
import AntiRagging from "./StudentCorner/AntiRagging";
import StudentCounselling from "./StudentCorner/StudentCounselling";
import Sports from "./StudentCorner/Sports";
import Privacy_policy from "./Privacy_policy";
import SeatDistribution from "./Admissions/SeatDistribution";
import Student_Login from "./Login/Student_Login";
import TeacherList from "./Backend/Admin/AllTeacherList_ToAdmin";
import SearchTeacher from "./Backend/Admin/SearchTeacher_ByAdmin";
import UpdateTeacher from "./Backend/Admin/UpdateTeacher_ByAdmin";
import AllStudentList_ToTeacher from "./Backend/Teacher/AllStudentList_ToTeacher";
import AddStudent_ByTeacher from "./Backend/Teacher/AddStudent_ByTeacher";
import UpdateStudent_ByTeacher from "./Backend/Teacher/UpdateStudent_ByTeacher";
import SearchStudent_ByTeacher from "./Backend/Teacher/SearchStudent_ByTeacher";
import AllStudentList from "./Backend/Admin/AllStudentList_ToAdmin";
import AddStudent_byadmin from "./Backend/Admin/AddStudent_ByAdmin";
import UpdateStudent_byAdmin from "./Backend/Admin/UpdateStudent_byAdmin";
import SearchStudent_byAdmins from "./Backend/Admin/SearchStudent_ByAdmin";
import AddTeacher_byadmin from "./Backend/Admin/AddTeacher_ByAdmin";
import StudentAdded_ByTeacher from "./Backend/Teacher/StudentAdded_ByTeacher";
import StudentAddedByAdmin from "./Backend/Admin/StudentAdded_ByAdmin";
import AdminProfile from "./Backend/Admin/AdminProfile";
import EditAdminProfile from "./Backend/Admin/EditAdminProfile";
import ChangePassword_ByAdmin from "./Backend/Admin/ChangePassword_ByAdmin";
import ChangePassword_ByTeacher from "./Backend/Teacher/ChangePassword_ByTeacher";
import TeacherProfile from "./Backend/Teacher/TeacherProfile";
import EditTeacherProfile from "./Backend/Teacher/EditTeacherProfile";
import AllSyllabusList_ToTeacher from "./Backend/Teacher/AllSyllabusList_ToTeacher";
import AddSyllabus_ByTeacher from "./Backend/Teacher/AddSyllabus_ByTeacher";
import SyllabusAdded_ByTeacher from "./Backend/Teacher/SyllabusAdded_ByTeacher";
import UploadFees_ByStudent from "./Backend/Student/UploadFees_ByStudent";
import AllFeesList_ToAdmin from "./Backend/Admin/AllFeesList_ToAdmin";
import SearchFeesListOfStudent_ByAdmin from "./Backend/Admin/SearchFeesListOfStudent_ByAdmin";
import SearchFeesListAccToSem_ByAdmin from "./Backend/Admin/SearchFeesListAccToSem_ByAdmin";
import AddMst1Marks_ByTeacher from "./Backend/Teacher/AddMst1Marks_ByTeacher";
import AllMarksList_ToTeacher from "./Backend/Teacher/AllMarksList_ToTeacher";
import AddMst2Marks_ByTeacher from "./Backend/Teacher/AddMst2Marks_ByTeacher";
import MarksAdded_ByTeacher from "./Backend/Teacher/MarksAdded_ByTeacher";
import UpdateMarks_ByTeacher from "./Backend/Teacher/UpdateMarks_ByTeacher";
import My_Marks from "./Backend/Student/My_Marks";
import MarkAttendence_ByTeacher from "./Backend/Teacher/MarkAttendence_ByTeacher";
import My_Attendance from "./Backend/Student/My_Attendance";
import SearchAttendence_ByTeacher from "./Backend/Teacher/SearchAttendence_ByTeacher";
import ExploreAttendence_ByTeacher from "./Backend/Teacher/ExploreAttendence_ByTeacher";
import Thanks from "./Register/Thanks";
import NoThanks from "./Register/NoThanks";
import ActivateAccount from "./Register/ActivateAccount";
import AllTimeTableList_ToTeacher from "./Backend/Teacher/AllTimeTableList_ToTeacher";
import AddTimeTable_ByTeacher from "./Backend/Teacher/AddTimeTable_ByTeacher";
import TimeTableAdded_ByTeacher from "./Backend/Teacher/TimeTableAdded_ByTeacher";
import TimeTable from "./Academics/TimeTable";
import My_Thesis from "./Backend/Student/My_Thesis";
import AllThesisList_ToTeacher from "./Backend/Teacher/AllThesisList_ToTeacher";
import SearchThesisbyID_ByTeacher from "./Backend/Teacher/SearchThesisbyID_ByTeacher";
import SearchThesisbyBatchCourse_ByTeacher from "./Backend/Teacher/SearchThesisbyBatchCourse_ByTeacher";
import AllThesisList_ToAdmin from "./Backend/Admin/AllThesisList_ToAdmin";
import SearchThesisbyID_ByAdmin from "./Backend/Admin/SearchThesisbyID_ByAdmin";
import SearchThesisbyBatchCourse_ByAdmin from "./Backend/Admin/SearchThesisbyBatchCourse_ByAdmin";
import SearchThesisbyGuideEmail_ByAdmin from "./Backend/Admin/SearchThesisbyGuideEmail_ByAdmin";


function Siteroutes()
{

    const location = useLocation();

    useEffect(() =>
    {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/adminhome" element={<AdminHome />}></Route>
                <Route path="/teacherhome" element={<TeacherHome />}></Route>
                <Route path="/studenthome" element={<StudentHome />}></Route>
                <Route path="/staff_login" element={<Authpage />}></Route>
                <Route path="/staff_register" element={<Authpage />}></Route>
                <Route path="/student_login" element={<Student_Login />}></Route>
                <Route path="/overview" element={<Overview />}></Route>
                <Route path="/recognition" element={<Recognition />}></Route>
                <Route path="/departmental_activities" element={<Departmental_Activities />}></Route>
                <Route path="/holidays_list" element={<Holiday_List />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/director" element={<Director />}></Route>
                <Route path="/rules_guidelines" element={<Rules_guide />}></Route>
                <Route path="/academic_overview" element={<Academic_Overview />}></Route>
                <Route path="/programmes" element={<Programmes />}></Route>
                <Route path="/mtech_ai" element={<Mtech_Ai />}></Route>
                <Route path="/mtech_es" element={<Mtech_Es />}></Route>
                <Route path="/mtech_vlsi" element={<Mtech_Vlsi />}></Route>
                <Route path="/academic_calendar" element={<Academic_Calender />}></Route>
                <Route path="/syllabus" element={<Syllabus />}></Route>
                <Route path="/fees_structure" element={<Fees_Structure />}></Route>
                <Route path="/procedure" element={<Procedure />}></Route>
                <Route path="/eligibility_criteria" element={<Eligibility_criteria />}></Route>
                <Route path="/admission_helpline" element={<Admission_help />}></Route>
                <Route path="/hod" element={<Hod />}></Route>
                <Route path="/list_of_faculty" element={<List_of_faculty />}></Route>
                <Route path="/staff" element={<Staff />}></Route>
                <Route path="/sponsored_projects" element={<SponsoredProjects />}></Route>
                <Route path="/student_projects" element={<StudentProjects />}></Route>
                <Route path="/library" element={<Library />}></Route>
                <Route path="/laboratories" element={<Laboratories />}></Route>
                <Route path="/hostel" element={<Hostel />}></Route>
                <Route path="/po_message" element={<PoMessage />}></Route>
                <Route path="/placement_acsd" element={<Placement_acsd />}></Route>
                <Route path="/contact_po" element={<Contact_Po />}></Route>
                <Route path="/antiragging" element={<AntiRagging />}></Route>
                <Route path="/studentcounselling" element={<StudentCounselling />}></Route>
                <Route path="/sports" element={<Sports />}></Route>
                <Route path="/privacy_policy" element={<Privacy_policy />}></Route>
                <Route path="/seat_distribution" element={<SeatDistribution />}></Route>


                {/* backend start */}


                <Route path="/thanks" element={<Thanks />}></Route>
                <Route path="/nothanks" element={<NoThanks />}></Route>
                <Route path="/activateaccount" element={<ActivateAccount />}></Route>


                {/* admin */}
                <Route path="/adminPanel" element={<TeacherList />}></Route>
                <Route path="/update_teacher_by_admin/:tid" element={<UpdateTeacher />}></Route>
                <Route path="/search_teacher" element={<SearchTeacher />}></Route>
                <Route path="/all_students_list_to_admin" element={<AllStudentList />}></Route>
                <Route path="/add_student_byadmin" element={<AddStudent_byadmin />}></Route>
                <Route path="/add_teacher_byAdmin" element={<AddTeacher_byadmin />}></Route>
                <Route path="/update_student_by_admin/:sid" element={<UpdateStudent_byAdmin />}></Route>
                <Route path="/search_student_byAdmin" element={<SearchStudent_byAdmins />}></Route>
                <Route path="/student_add_by_Admin" element={<StudentAddedByAdmin />}></Route>
                <Route path="/adminprofile" element={<AdminProfile />}></Route>
                <Route path="/edit_profile_of_admin" element={<EditAdminProfile />}></Route>
                <Route path="/changepassword_for_admin" element={<ChangePassword_ByAdmin />}></Route>
                <Route path="/all_fees_list_to_admin" element={<AllFeesList_ToAdmin />}></Route>
                <Route path="/search_fees_by_sem_for_admin" element={<SearchFeesListAccToSem_ByAdmin />}></Route>
                <Route path="/search_fees_by_studentid_for_admin" element={<SearchFeesListOfStudent_ByAdmin />}></Route>
                <Route path="/all_thesis_list_to_admin" element={<AllThesisList_ToAdmin />}></Route>
                <Route path="/search_thesis_by_ID_by_admin" element={<SearchThesisbyID_ByAdmin />}></Route>
                <Route path="/search_thesis_by_BatchCourse_by_admin" element={<SearchThesisbyBatchCourse_ByAdmin />}></Route>
                <Route path="/search_thesis_by_guideEmail_by_admin" element={<SearchThesisbyGuideEmail_ByAdmin />}></Route>



                {/* teacher */}
                <Route path="/teacherPanel" element={<AllStudentList_ToTeacher />}></Route>
                <Route path="/add_student" element={<AddStudent_ByTeacher />}></Route>
                <Route path="/update_student_by_teacher/:sid" element={<UpdateStudent_ByTeacher />}></Route>
                <Route path="/search_student" element={<SearchStudent_ByTeacher />}></Route>
                <Route path="/student_add_by_teacher" element={<StudentAdded_ByTeacher />}></Route>
                <Route path="/teacherprofile" element={<TeacherProfile />}></Route>
                <Route path="/edit_profile_of_teacher" element={<EditTeacherProfile />}></Route>
                <Route path="/changepassword_for_teacher" element={<ChangePassword_ByTeacher />}></Route>
                <Route path="/all_syllabus_list_to_teacher" element={<AllSyllabusList_ToTeacher />}></Route>
                <Route path="/add_syllabus" element={<AddSyllabus_ByTeacher />}></Route>
                <Route path="/syllabus_add_by_me_teacher" element={<SyllabusAdded_ByTeacher />}></Route>
                <Route path="/all_students_marks_list_to_teacher" element={<AllMarksList_ToTeacher />}></Route>
                <Route path="/marks_added_by_me_teacher" element={<MarksAdded_ByTeacher />}></Route>
                <Route path="/add_mst_1_marks_by_teacher" element={<AddMst1Marks_ByTeacher />}></Route>
                <Route path="/add_mst_2_marks_by_teacher" element={<AddMst2Marks_ByTeacher />}></Route>
                <Route path="/update_marks_by_teacher/:mid" element={<UpdateMarks_ByTeacher />}></Route>
                <Route path="/mark_attendance_by_teacher" element={<MarkAttendence_ByTeacher />}></Route>
                <Route path="/search_attendence_by_teacher" element={<SearchAttendence_ByTeacher />}></Route>
                <Route path="/explore_attendance_by_teacher/:aid" element={<ExploreAttendence_ByTeacher />}></Route>
                <Route path="/all_timetable_list_to_teacher" element={<AllTimeTableList_ToTeacher />}></Route>
                <Route path="/add_timetable" element={<AddTimeTable_ByTeacher />}></Route>
                <Route path="/timetable_add_by_me_teacher" element={<TimeTableAdded_ByTeacher />}></Route>
                <Route path="/all_thesis_list_to_teacher" element={<AllThesisList_ToTeacher />}></Route>
                <Route path="/search_thesis_by_ID_by_teacher" element={<SearchThesisbyID_ByTeacher />}></Route>
                <Route path="/search_thesis_by_BatchCourse_by_teacher" element={<SearchThesisbyBatchCourse_ByTeacher />}></Route>



                {/* student */}
                <Route path="/upload_fees_by_student" element={<UploadFees_ByStudent />}></Route>
                <Route path="/my_marks" element={<My_Marks />}></Route>
                <Route path="/my_attendance" element={<My_Attendance />}></Route>
                <Route path="/timetable" element={<TimeTable />}></Route>
                <Route path="/my_thesis" element={<My_Thesis />}></Route>

            </Routes>
        </div>
    )
}

export default Siteroutes
