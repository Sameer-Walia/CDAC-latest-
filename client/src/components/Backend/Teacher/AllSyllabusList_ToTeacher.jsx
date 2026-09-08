import React from 'react'
import { useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function AllSyllabusList_ToTeacher()
{
    const [loading, setloading] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [allsyllabus_data, setallsyllabus_data] = useState([]);
    const navi = useNavigate()

    useEffect(() =>
    {
        document.title = "All Syllabus List"
    }, [])

    useEffect(() =>
    {
        fetchallsyllabus()
    }, [])

    async function fetchallsyllabus()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_all_syllabusList_by_teacher`, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                setallsyllabus_data(resp.data.allsyllabus_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setallsyllabus_data([]);
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
                return toast.error("No Id Found")
            }
            const confirmdelete = window.confirm("Are you sure to Delete")
            if (confirmdelete)
            {
                setloading(true)
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_syllabus_by_teacher/${id}`, { withCredentials: true })

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    fetchallsyllabus()
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
                            <h1 className="hd">Syllabus List</h1>
                            <button
                                className="search-btn"
                                onClick={() => navi("/syllabus_add_by_me_teacher")}
                            >
                                ➕ Added By Me
                            </button>
                            <button
                                className="search-btn"
                                onClick={() => navi("/add_syllabus")}
                            >
                                ➕ Add Syllabus
                            </button>
                        </div>
                        <div id="teacher_list" className="table-container">
                            <table className="teacher-table mt-4">
                                <thead>
                                    <tr>
                                        <th>S.NO.</th>
                                        <th>Subject Name</th>
                                        <th>View</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allsyllabus_data && allsyllabus_data.length > 0 ?
                                        allsyllabus_data.map((item, index) =>
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.subjectname}</td>
                                                <td>
                                                    <a
                                                        href={`${import.meta.env.VITE_API_URL}/uploads/syllabus/${item.syllabus_pdf}`}
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

export default AllSyllabusList_ToTeacher
