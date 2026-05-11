import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import "./Teacher.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function SearchAttendence_ByTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate()

    const { email } = useSelector((state) => state.teacher)

    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [date, setDate] = useState("");

    const [attendance_data, setattendance_data] = useState([]);


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
        document.title = "Search Attendance"
    }, [])


    async function handleSearch()
    {
        try
        {
            setloading(true)

            if (course === "")
            {
                return toast.error("Please Select Course")
            }
            if (semester === "")
            {
                return toast.error("Please Select Semester")
            }
            if (subjectCode === "")
            {
                return toast.error("Please Select Subject Code")
            }
            if (date === "")
            {
                return toast.error("Please Select Date")
            }

            const data = { email, course, semester, subjectCode, date }

            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/search_attendance_by_teacher`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                setattendance_data(resp.data.attendance_data)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setattendance_data([]);
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

    async function handleDelete(id)
    {
        try
        {
            setloading(true)
            const resp = window.confirm("Are you sure to Delete")

            if (resp === true)
            {
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_attendence_by_teacher/${id}`)

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                }
                else 
                {
                    toast.error(resp.data.msg)
                }
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
                    <h1 className="hd text-center">Search Attendance</h1>

                    <div className="attendance-filter-box">

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

                        <div className="search-email-box ">
                            <button onClick={handleSearch} disabled={loading} className='mt-3'>
                                {loading ? "🔍 Searching..." : "🔍 Search"}
                            </button>
                        </div>
                    </div>

                    {
                        attendance_data.length > 0 ?


                            <div id="teacher_list" className="table-container">
                                <table className="teacher-table mt-4">
                                    <thead className="text-center">
                                        <tr>
                                            <th>S.NO.</th>
                                            <th>Course</th>
                                            <th>Semester</th>
                                            <th>Subject Code</th>
                                            <th>Date</th>
                                            <th>Explore</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            attendance_data.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.course}</td>
                                                    <td>{item.semester}</td>
                                                    <td>{item.subjectCode}</td>
                                                    <td>{item.attendanceDate}</td>
                                                    <td>
                                                        <button className="edit-btn" onClick={() => navi(`/explore_attendance_by_teacher/${item._id}`)}>
                                                            ✏️
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                                                            🗑
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            null
                    }

                </div>

            </div>
        </div >
    )
}

export default SearchAttendence_ByTeacher
