import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import "./Student.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Footer from '../../Footer/Footer';


function My_Attendance()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate()

    const { batch, course, studentID } = useSelector((state) => state.student)
    const [semester, setSemester] = useState("");

    const [my_attendance, setmy_attendance] = useState([]);

    useEffect(() =>
    {
        document.title = "My Attendance"
    }, [])

    useEffect(() =>
    {
        if (semester)
        {
            fetch_my_attendance_acc_to_sem()
        }

    }, [semester])

    async function fetch_my_attendance_acc_to_sem()
    {
        try
        {
            if (!batch?.trim() || !course?.trim() || !semester?.trim() || !studentID?.trim())
            {
                return toast.error("Cannot Fetch Attendence")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_my_attendance_acc_to_sem/${batch}/${course}/${semester}/${studentID}`);

            if (resp.data.statuscode === 1)
            {
                setmy_attendance(resp.data.my_attendance_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setmy_attendance([])
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
        <div>
            <div id="student_page" className="p-4">

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

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/studenthome" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Student Corner</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Attendance</span>
                    </div>
                </div>

                <h1 className="text-center  hd">Attendance</h1>

                <div className="attendance-filter-box">

                    <div className="filter-group">
                        <label>Course</label>
                        <select
                            value={course}
                            disabled
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
                            onChange={(e) => setSemester(e.target.value)}
                            required
                        >
                            <option value="">Select Semester</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                        </select>
                    </div>

                </div>

                {
                    my_attendance && my_attendance.length > 0 ?

                        <div id="student_marks_table" className="table-responsive mt-4">
                            <table className="table custom-table text-center align-middle">

                                <thead>
                                    <tr>
                                        <th>S.NO.</th>
                                        <th>Subject Code</th>
                                        <th>Total Classes</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>Attendance %</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        my_attendance.map((item, index) =>
                                        {
                                            const percentage = ((item.presentCount / item.totalClasses) * 100).toFixed(1);

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.subjectCode}</td>
                                                    <td>{item.totalClasses}</td>
                                                    <td>{item.presentCount}</td>
                                                    <td>{item.absentCount}</td>
                                                    <td>{percentage}% </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        semester && !loading ?

                            <h4 className="text-center mt-5">
                                No Attendance Found
                            </h4>
                            :
                            null
                }

            </div>

            <Footer />

        </div >
    )
}

export default My_Attendance

