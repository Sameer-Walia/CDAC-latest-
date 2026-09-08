import React from 'react'
import { useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

function TimeTableAdded_ByTeacher()
{
    const [loading, setloading] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [mytimetable_data, setmyTimeTable_data] = useState([]);
    const navi = useNavigate()

    const { email } = useSelector((state) => state.teacher)

    useEffect(() =>
    {
        document.title = "Time-Table List"
    }, [])

    useEffect(() =>
    {
        if (email)
        {
            fetch_my_syllabus()
        }
    }, [email])

    async function fetch_my_syllabus()
    {
        try
        {
            if (!email?.trim())
            {
                return toast.error("Teacher Email Not Found")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_TimeTableList_added_by_me_teacher/${email}`, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                setmyTimeTable_data(resp.data.my_TimeTable_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setmyTimeTable_data([]);
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
            if (!id?.trim())
            {
                return toast.error("ID Not Found")
            }
            const confirmdelete = window.confirm("Are you sure to Delete")
            if (confirmdelete)
            {
                setloading(true)
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_timetable_by_teacher/${id}`, { withCredentials: true })

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    fetch_my_syllabus()
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
        <div>
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
                            <h1 className="hd">Time-Table List</h1>
                            <button
                                className="search-btn"
                                onClick={() => navi("/syllabus_add_by_me_teacher")}
                            >
                                ➕ Added By Me
                            </button>
                            <button
                                className="search-btn"
                                onClick={() => navi("/add_timetable")}
                            >
                                ➕ Add Time-Table
                            </button>
                        </div>
                        <div id="teacher_list" className="table-container">
                            <table className="teacher-table mt-4">
                                <thead>
                                    <tr>
                                        <th>S.NO.</th>
                                        <th>Course</th>
                                        <th>Semester</th>
                                        <th>View</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mytimetable_data && mytimetable_data.length > 0 ?
                                        mytimetable_data.map((item, index) =>
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.Course}</td>
                                                <td>{item.Semester}</td>
                                                <td>
                                                    <a
                                                        href={`${import.meta.env.VITE_API_URL}/uploads/timetable/${item.TimeTable_pdf}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View PDF
                                                    </a>
                                                </td>
                                                <td>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        🗑
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="12" style={{ textAlign: "center" }}>
                                                No Data Found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TimeTableAdded_ByTeacher
