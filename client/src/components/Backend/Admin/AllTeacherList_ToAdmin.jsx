import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AllTeacherList_ToAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [teachersdata, setteachersdata] = useState([]);
    const navi = useNavigate();

    useEffect(() =>
    {
        localStorage.setItem("tabLink", "teacherlist");
    }, []);

    useEffect(() =>
    {
        document.title = "All Teachers-List"
    }, [])

    useEffect(() =>
    {
        fetchallTeachers()
    }, [])

    async function fetchallTeachers()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_all_Teachers_to_admin `, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                setteachersdata(resp.data.allteachers_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setteachersdata([]);
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
        navi(`/update_teacher_by_admin/${id}`)
    }

    async function handleDelete(id)
    {
        try
        {
            const confirmdelete = window.confirm("Are you sure to Delete")

            if (confirmdelete)
            {
                setloading(true)
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_teacher_by_admin/${id}` , {withCredentials:true})

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    fetchallTeachers()
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
                    <div className="header-row">
                        <h1 className="hd">Teachers List</h1>

                        <button
                            className="search-btn"
                            onClick={() => navi("/add_teacher_by_admin")}
                        >
                            ➕ Add Teacher
                        </button>

                        <button
                            className="search-btn"
                            onClick={() => navi("/search_teacher_by_admin")}
                        >
                            🔍 Search Teacher
                        </button>
                    </div>
                    <div id="teacher_list" className="table-container">
                        <table className="teacher-table mt-4">
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>User Type</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {teachersdata && teachersdata.length > 0 ?
                                    teachersdata.map((item, index) =>
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>{item.usertype}</td>
                                            <td>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(item._id)}
                                                >
                                                    ✏️
                                                </button>
                                            </td>

                                            {/* Delete Column */}
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
                                        <td colSpan="8" style={{ textAlign: "center" }}>
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
    );
}

export default AllTeacherList_ToAdmin;