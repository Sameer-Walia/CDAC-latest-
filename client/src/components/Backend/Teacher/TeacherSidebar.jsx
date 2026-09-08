import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Teacher.css";

function TeacherSidebar({ collapse, setCollapse })
{

    const [open, setOpen] = useState(false);

    const handleCollapse = () =>
    {
        if (window.innerWidth > 768)
        {
            setCollapse(prev => !prev);
        }
    };

    const [activeTab, setActiveTab] = useState("");

    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
            const savedTab = localStorage.getItem("tabLink");
            if (savedTab)
            {
                setActiveTab(savedTab);
            }
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    const handleTabClick = (tab) =>
    {
        setActiveTab(tab);
        localStorage.setItem("tabLink", tab);
    };

    return (
        <div id="Teacher_page">

            <div className="teacher_container">

                {open && (
                    <div
                        className="overlay_two"
                        onClick={() => setOpen(false)}
                    ></div>
                )}

                <button className="menu-btn" onClick={() => setOpen(!open)}>
                    ☰
                </button>

                <div className={`teacher_sidebar ${open ? "active" : ""} ${collapse ? "collapsed" : ""}`}>

                    <div className="top-section">
                        <h2 className="logo">{collapse ? "TP" : "Teacher Panel"}</h2>

                        <button className="collapse-btn" onClick={handleCollapse}>
                            {collapse ? "➡" : "⬅"}
                        </button>
                    </div>

                    <ul>

                        <li data-title="students" className={activeTab === "studentlist" ? "active" : ""}>
                            <Link to="/teacherPanel" onClick={() => handleTabClick("studentlist")}>
                                <span className="icon">🎓</span>
                                <span className="text">Students</span>
                            </Link>
                        </li>

                        <li data-title="syallabus" className={activeTab === "syallabus" ? "active" : ""}>
                            <Link to="/all_syllabus_list_to_teacher" onClick={() => handleTabClick("syallabus")}>
                                <span className="icon">📚</span>
                                <span className="text">Syllabus</span>
                            </Link>
                        </li>

                        <li data-title="timetable" className={activeTab === "timetable" ? "active" : ""}>
                            <Link to="/all_timetable_list_to_teacher" onClick={() => handleTabClick("timetable")}>
                                <span className="icon">⏰</span>
                                <span className="text">Time Table</span>
                            </Link>
                        </li>

                        <li data-title="all_marks_list" className={activeTab === "all_marks_list" ? "active" : ""}>
                            <Link to="/all_students_marks_list_to_teacher" onClick={() => handleTabClick("all_marks_list")}>
                                <span className="icon">📊</span>
                                <span className="text">Upload Marks</span>
                            </Link>
                        </li>

                        <li data-title="mark_attendance" className={activeTab === "mark_attendance" ? "active" : ""}>
                            <Link to="/mark_attendance_by_teacher" onClick={() => handleTabClick("mark_attendance")}>
                                <span className="icon">✅</span>
                                <span className="text">Attendance</span>
                            </Link>
                        </li>

                        <li data-title="Thesis" className={activeTab === "Thesis" ? "active" : ""}>
                            <Link to="/all_thesis_list_to_teacher" onClick={() => handleTabClick("Thesis")}>
                                <span className="icon">📄</span>
                                <span className="text">Thesis</span>
                            </Link>
                        </li>

                        <li data-title="teacherprofile" className={activeTab === "teacherprofile" ? "active" : ""}>
                            <Link to="/teacherprofile" onClick={() => handleTabClick("teacherprofile")}>
                                <span className="icon">👤</span>
                                <span className="text">My Profile</span>
                            </Link>
                        </li>

                        <li data-title="changepassword_for_teacher" className={activeTab === "changepassword" ? "active" : ""}>
                            <Link to="/changepassword_for_teacher" onClick={() => handleTabClick("changepassword")}>
                                <span className="icon">🔒</span>
                                <span className="text">Change Password</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
        </div >
    )
}

export default TeacherSidebar
