import React, { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TeacherSidebar from "./TeacherSidebar";

function AddMst1Marks_ByTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);

    const [type, settype] = useState("MST-1");
    const [studentID, setStudentID] = useState("");
    const [obtainedMarks, setObtainedMarks] = useState("");
    const [student_data, setstudent_data] = useState(null);

    const navi = useNavigate();
    const { email } = useSelector((state) => state.teacher)

    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [subjectCode, setSubjectCode] = useState("");


    const subjectsData = {
        AI: {
            1: ["AI101", "ML101", "Math101", "AI301", "NLP301"],
            2: ["AI201", "DL201", "Stats201", "AI301"],
            3: ["AI301", "NLP301"]
        },
        VLSI: {
            1: ["VLSI101", "Electronics101", "VLSI201", "Digital201", "VLSI201"],
            2: ["VLSI201", "Digital201", "Stats201", "AI301"],
            3: ["VLSI301", "Electronics101"]
        },
        ES: {
            1: ["ES101", "Micro101", "ES201", "RTOS201", "ES301"],
            2: ["ES201", "RTOS201", "ES201", "RTOS201"],
            3: ["ES301", "ES201"]
        }
    };

    useEffect(() =>
    {
        document.title = "Upload Marks"
    }, [])

    async function handleSearchStudent()
    {
        try
        {
            setloading(true)

            if (studentID === "")
            {
                toast.error("Enter student ID")
                return
            }

            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/search_student_by_teacher/${studentID}`);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                setCourse("");
                setSemester("");
                setSubjectCode("");
                setstudent_data(resp.data.student_data)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setstudent_data(null);
            }
        }
        catch (e)
        {
            toast.error("Error Occured : " + (e.response?.data?.msg || e.message))
        }
        finally
        {
            setloading(false)
        }
    }

    async function handleSubmit(e) 
    {
        e.preventDefault();

        if (!studentID || !course || !semester || !subjectCode || !obtainedMarks || !email || !type)
        {
            toast.error("All fields are required");
            return;
        }

        if (Number(obtainedMarks) > 24)
        {
            toast.error("Obtained marks cannot be greater than total marks");
            return;
        }

        try
        {
            setloading(true);

            const data = { studentID, course, semester, subjectCode, obtainedMarks, email, type }

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/add_mst_marks_by_teacher`, data);

            if (res.data.statuscode === 1)
            {
                toast.success(res.data.msg);
                setStudentID("");
                setCourse("");
                setSemester("");
                setSubjectCode("");
                setObtainedMarks("");
                navi("/all_students_marks_list_to_teacher")
            }
            else
            {
                toast.error(res.data.msg);
            }
        }
        catch (e) 
        {
            toast.error("Error Occured : " + (e.response?.data?.msg || e.message))
        }
        finally
        {
            setloading(false)
        }
    }

    return (
        <div id="Teacher_page">

            {loading && (
                <div className="overlay">
                    <div>
                        <div className="spinner"></div>
                        <p style={{ color: "white", marginTop: "10px" }}>
                            Please wait...
                        </p>
                    </div>
                </div>
            )}

            <div className="teacher_container">

                <TeacherSidebar collapse={collapse} setCollapse={setCollapse} />

                <div className={`teacher_maincontent ${collapse ? "expand" : ""}`}>
                    <h1 className="hd text-center">Add Mst-1 Marks</h1>

                    <div className="search_student_container ">

                        <div className="marksForm_group">
                            <input type="text" placeholder=" " value={studentID} onChange={(e) => setStudentID(e.target.value)} className="marksForm_input" required />
                            <label className="marksForm_label">Student ID</label>
                        </div>

                        <button
                            type="button"
                            className="search_student_btn"
                            onClick={handleSearchStudent}
                        >
                            Search Student
                        </button>
                    </div>

                    {
                        student_data &&
                        <>
                            <div className="student_form_wrapper">
                                <div className="student_card">
                                    <h3 className="student_card_title">Student Details</h3>

                                    <div className="student_info">
                                        <span>Name:</span>
                                        <p>{student_data?.name || "-"}</p>
                                    </div>

                                    <div className="student_info">
                                        <span>Batch:</span>
                                        <p>{student_data?.batch || "-"}</p>
                                    </div>

                                    <div className="student_info">
                                        <span>Course:</span>
                                        <p>{student_data?.course || "-"}</p>
                                    </div>

                                     <div className="student_info">
                                        <span>ID:</span>
                                        <p>{student_data?.studentID || "-"}</p>
                                    </div>

                                    <div className="student_info">
                                        <span>Email:</span>
                                        <p>{student_data?.email || "-"}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="marksForm_container">

                                    <div className="marksForm_row">

                                        <div className="marksForm_group">
                                            <select
                                                value={course}
                                                onChange={(e) =>
                                                {
                                                    setCourse(e.target.value);
                                                    setSemester("");
                                                    setSubjectCode("");
                                                }}
                                                className="marksForm_input"
                                                required
                                            >
                                                <option value="">Select Course</option>
                                                <option value="AI"> M.Tech – Artificial Intelligence (AI)</option>
                                                <option value="VLSI">M.Tech - VLSI Design</option>
                                                <option value="ES"> M.Tech - Embedded Systems (ES)</option>
                                            </select>
                                        </div>

                                        <div className="marksForm_group">
                                            <select
                                                value={semester}
                                                onChange={(e) =>
                                                {
                                                    setSemester(e.target.value);
                                                    setSubjectCode("");
                                                }}
                                                className="marksForm_input"
                                                required
                                            >
                                                <option value="">Select Semester</option>
                                                <option value="1">Semester 1</option>
                                                <option value="2">Semester 2</option>
                                                <option value="3">Semester 3</option>
                                            </select>
                                        </div>

                                        <div className="marksForm_group">
                                            <select
                                                value={subjectCode}
                                                onChange={(e) => setSubjectCode(e.target.value)}
                                                className="marksForm_input"
                                                required
                                                disabled={!semester || !course}
                                            >
                                                <option value="">Select SubjectCode</option>

                                                {subjectsData[course]?.[semester]?.map((sub, index) => (
                                                    <option key={index} value={sub}>
                                                        {sub}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>

                                    </div>

                                    <div className="marksForm_group">
                                        <input type="number" placeholder=" " value={24} className="marksForm_input" disabled />
                                        <label className="marksForm_label">Total Marks</label>
                                    </div>

                                    <div className="marksForm_group">
                                        <input type="tel" placeholder=" " value={obtainedMarks} onChange={(e) => setObtainedMarks(e.target.value)} className="marksForm_input" required />
                                        <label className="marksForm_label">Obtained Marks</label>
                                    </div>

                                    <button type="submit" className="marksForm_button">
                                        Submit Marks
                                    </button>

                                </form>
                            </div>
                        </>

                    }


                </div>
            </div>
        </div>
    )
}

export default AddMst1Marks_ByTeacher;