import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function SearchStudent_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [studentid, setstudentid] = useState("");
    const [student_data, setstudent_data] = useState(null);
    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Search Student"
    }, [])

    async function handleSearch()
    {
        try
        {
            setstudent_data(null);
            if (!studentid)
            {
                return toast.error("Enter student ID")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/search_student_by_admin/${studentid}`, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
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


    function handleEdit(id)
    {
        navi(`/update_student_by_admin/${id}`)
    }

    async function handleDelete(id)
    {
        try
        {
            if (!id)
            {
                return toast.error("Student ID not found")
            }
            const confirmdelete = window.confirm("Are you sure to Delete")
            if (confirmdelete)
            {
                setloading(true)
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_student_by_admin/${id}`, { withCredentials: true })

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    setstudent_data(null)
                    setstudentid("")
                }
                else 
                {
                    toast.error(resp.data.msg)
                }
            }
        }
        catch (e)
        {
            toast.error("Error Occured " + (e.response?.data?.msg || e.message))
        }
        finally
        {
            setloading(false)
        }
    }


    return (
        <div id="admin_page">

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

            <div className="admin_container">

                <AdminSidebar collapse={collapse} setCollapse={setCollapse} />

                <div className={`admin_maincontent ${collapse ? "expand" : ""}`}>
                    <h1 className="hd text-center">Search Student</h1>
                    <div className="search-email-box">
                        <input type="text" placeholder="Enter Student Id..." value={studentid} onChange={(e) => setstudentid(e.target.value)} />
                        <button onClick={handleSearch} disabled={loading}>
                            {loading ? "🔍 Searching..." : "🔍 Search"}
                        </button>
                    </div>
                    {
                        student_data &&
                        <div id="teacher_list" className="table-container">
                            <table className="teacher-table mt-4">
                                <thead>
                                    <tr>
                                        <th>S.NO.</th>
                                        <th>Name</th>
                                        <th>ID</th>
                                        <th>Password</th>
                                        <th>Batch</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Father Name</th>
                                        <th>Mother Name</th>
                                        <th>Phone No</th>
                                        <th>Phone No(2)</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr key={student_data?._id || ""}>
                                        <td>1</td>
                                        <td>{student_data?.name || ""}</td>
                                        <td>{student_data?.studentID || ""}</td>
                                        <td>{student_data?.password || ""}</td>
                                        <td>{student_data?.batch || ""}</td>
                                        <td>{student_data?.course || ""}</td>
                                        <td>{student_data?.email || ""}</td>
                                        <td>{student_data?.father || ""}</td>
                                        <td>{student_data?.mother || ""}</td>
                                        <td>{student_data?.phone || ""}</td>
                                        <td>{student_data?.phone2 || ""}</td>
                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(student_data?._id || "")}
                                            >
                                                ✏️
                                            </button>
                                        </td>

                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(student_data?._id || "")}
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default SearchStudent_ByAdmin