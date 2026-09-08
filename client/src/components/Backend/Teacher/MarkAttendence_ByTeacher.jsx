import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import "./Teacher.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function MarkAttendence_ByTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate()

    const [batch, setbatch] = useState("")
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [subjectCode, setSubjectCode] = useState("");

    const [course_students, setcourse_students] = useState([]);


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
        document.title = "Mark Attendance"
    }, [])

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() =>
    {
        if (batch && course)
        {
            fetch_students_acc_to_batch_Course()
        }
    }, [batch, course])

    async function fetch_students_acc_to_batch_Course()
    {
        try
        {
            if (!batch?.trim())
            {
                toast.error("Please Select Batch")
            }
            if (!course?.trim())
            {
                toast.error("Please Select Course")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_students_acc_to_batch_Course/${batch}/${course}`, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                setcourse_students(resp.data.course_students_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setcourse_students([]);
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

    const { email } = useSelector((state) => state.teacher)

    async function submitAttendnace(e)
    {
        e.preventDefault()
        try
        {
            if (!batch?.trim())
            {
                return toast.error("Please Select Batch")
            }

            if (!course?.trim())
            {
                return toast.error("Please Select Course")
            }

            if (!semester?.trim())
            {
                return toast.error("Please Select Semester")
            }

            if (!subjectCode?.trim())
            {
                return toast.error("Please Select Subject Code")
            }

            if (!date?.trim())
            {
                return toast.error("Please Select Date")
            }

            setloading(true)
            const formData = new FormData(e.target);
            const students = course_students.map((item) => ({
                studentID: item.studentID,
                studentName: item.name,
                studentEmail: item.email,
                attendanceStatus: formData.get(`attendance_${item.studentID}`)
            }));

            const data = { email, batch, course, semester, subjectCode, date, students }

            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/submit_Attendnace_by_teacher`, data, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                setCourse("")
                setSemester("")
                setSubjectCode("")
                setcourse_students([]);
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
                    <div className="header-row">
                        <h1 className="hd ">Mark Attendance</h1>
                        <button
                            className="search-btn"
                            onClick={() => navi("/search_attendence_by_teacher")}
                        >
                            🔍 Search Attendance
                        </button>
                    </div>

                    <div className="attendance-filter-box">

                        <div className="filter-group">
                            <label>Batch</label>
                            <select
                                onChange={(e) =>
                                {
                                    setbatch(e.target.value)
                                    setcourse_students([]);
                                    setCourse("");
                                    setSemester("");
                                    setSubjectCode("");
                                }}
                                required>
                                <option value="">Select Batch</option>
                                <option value="2025-2027">2025-2027</option>
                                <option value="2026-2028">2026-2028</option>
                                <option value="2027-2029">2027-2029</option>
                                <option value="2028-2030">2028-2030</option>
                                <option value="2029-2031">2029-2031</option>
                                <option value="2030-2032">2030-2032</option>
                                <option value="2031-2033">2031-2033</option>
                                <option value="2032-2034">2032-2034</option>
                                <option value="2033-2035">2033-2035</option>
                                <option value="2034-2036">2034-2036</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Course</label>
                            <select
                                value={course}
                                onChange={(e) =>
                                {
                                    setCourse(e.target.value);
                                    setSemester("");
                                    setSubjectCode("");
                                }}
                                required
                            >
                                <option value="">Select Course</option>
                                <option value="AI"> M.Tech – Artificial Intelligence (AI)</option>
                                <option value="VLSI">M.Tech - VLSI Design</option>
                                <option value="ES"> M.Tech - Embedded Systems (ES)</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Semester</label>
                            <select
                                value={semester}
                                onChange={(e) =>
                                {
                                    setSemester(e.target.value);
                                    setSubjectCode("");
                                }}
                                required
                            >
                                <option value="">Select Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Subject- Code</label>
                            <select
                                value={subjectCode}
                                onChange={(e) => setSubjectCode(e.target.value)}
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

                        <div className="filter-group">
                            <label>Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                    </div>

                    {
                        course_students && course_students.length > 0 ?

                            <form name="attendance_form" onSubmit={submitAttendnace}>

                                <div id="teacher_list" className="table-container">
                                    <table className="teacher-table mt-4" >
                                        <thead className='text-center'>
                                            <tr>
                                                <th>S.NO.</th>
                                                <th>Student ID</th>
                                                <th>Name</th>
                                                <th>Batch</th>
                                                <th>Course</th>
                                                <th>Email</th>
                                                <th>Attendance</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                course_students.map((item, index) =>
                                                    <tr key={item._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.studentID}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.batch}</td>
                                                        <td>{item.course}</td>
                                                        <td>{item.email}</td>
                                                        <td>
                                                            <div className="attendance-action">

                                                                <label className="present-box">
                                                                    <input
                                                                        type="radio"
                                                                        name={`attendance_${item.studentID}`}
                                                                        value="Present"
                                                                        required
                                                                    />
                                                                    Present
                                                                </label>

                                                                <label className="absent-box">
                                                                    <input
                                                                        type="radio"
                                                                        name={`attendance_${item.studentID}`}
                                                                        value="Absent"
                                                                        required
                                                                    />
                                                                    Absent
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>

                                    </table>

                                    <button type="submit" className="register-button mt-3" disabled={loading}>
                                        {loading ? "Submitting Attendance..." : "Submit Attendance"}
                                    </button>

                                </div>

                            </form> : null
                    }

                </div>

            </div>
        </div >
    )
}

export default MarkAttendence_ByTeacher
