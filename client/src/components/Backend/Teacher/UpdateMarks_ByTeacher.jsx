import React, { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useSelector } from "react-redux";

function UpdateMarks_ByTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);

    const [studentID, setStudentID] = useState("");
    const [type, settype] = useState("");
    const [obtainedMarks, setObtainedMarks] = useState("");

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

    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Update Marks"
    }, [])

    const { mid } = useParams()

    useEffect(() =>
    {
        if (mid)
        {
            fetch_student_data()
        }
    }, [mid])

    async function fetch_student_data()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_marks_data_by_teacher/${mid}`);

            if (resp.data.statuscode === 1)
            {
                const marks = resp.data.student_marks;
                setStudentID(marks.studentID);
                setObtainedMarks(marks.obtainedMarks)
                settype(marks.type);
                setCourse(marks.course)
                setSemester(marks.semester)
                setSubjectCode(marks.subjectCode)
            }
            else 
            {
                toast.warn(resp.data.msg)
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

    async function UpdateStudentMarks(e)
    {
        e.preventDefault()
        try
        {
            if (!studentID || !type || !course || !semester || !subjectCode || !obtainedMarks || !email)
            {
                toast.error("All fields are required");
                return;
            }

            if (Number(obtainedMarks) > 24)
            {
                toast.error("Obtained marks cannot be greater than total marks");
                return;
            }

            setloading(true)
            const student_marks = { mid, studentID, type, course, semester, subjectCode, obtainedMarks, email }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_student_marks_by_teacher`, student_marks);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                navi("/all_students_marks_list_to_teacher")
            }
            else 
            {
                toast.warn(resp.data.msg)
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
                    <h1 className="hd text-center">Update Student</h1>

                    <form name="updateform" onSubmit={UpdateStudentMarks}>

                        <div className="form-container">

                            <div className="form-group">
                                <label>Student ID</label>
                                <input type="text" placeholder="Enter StudentID" value={studentID || ""}
                                    required onChange={(e) => setStudentID(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Select Course</label>
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

                            <div className="form-group">
                                <label>Select Semester</label>
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

                            <div className="form-group">
                                <label>Select Subject-Code</label>
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


                            <div className="form-group">
                                <label>Total Marks</label>
                                <input type="email" placeholder="Total Marks" value={24} disabled />
                            </div>

                            <div className="form-group">
                                <label>Obtained Marks</label>
                                <input type="text" placeholder="Enter phone number" value={obtainedMarks || ""}
                                    required onChange={(e) => setObtainedMarks(e.target.value)} />
                            </div>


                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Updating Marks..." : "Update Marks"}
                            </button>

                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
}

export default UpdateMarks_ByTeacher;