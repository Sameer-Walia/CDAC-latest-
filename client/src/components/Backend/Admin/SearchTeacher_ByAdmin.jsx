import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function SearchTeacher_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [teacher_data, setteacher_data] = useState(null);
    const [loading, setloading] = useState(false);
    const [email, setEmail] = useState("");
    const navi = useNavigate();


    useEffect(() =>
    {
        document.title = "Search Teacher"
    }, [])


    async function handleSearch()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/search_teacher_by_admin/${email}`);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                setteacher_data(resp.data.teacher_data)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setteacher_data(null);
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
            setloading(true)
            const resp = window.confirm("Are you sure to Delete")

            if (resp === true)
            {
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_teacher_by_admin/${id}`)

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    setteacher_data(null);
                    setEmail("")
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
                    <h1 className="hd text-center">Search Teacher</h1>
                    <div className="search-email-box">
                        <input type="email" placeholder="Enter teacher email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={handleSearch} disabled={loading}>
                            {loading ? "🔍 Searching..." : "🔍 Search"}
                        </button>
                    </div>
                    {
                        teacher_data &&
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
                                    <tr key={teacher_data?._id || ""}>
                                        <td>1</td>
                                        <td>{teacher_data?.name || ""}</td>
                                        <td>{teacher_data?.phone || ""}</td>
                                        <td>{teacher_data?.email || ""}</td>
                                        <td>{teacher_data?.usertype || ""}</td>
                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(teacher_data?._id || "")}
                                            >
                                                ✏️
                                            </button>
                                        </td>

                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(teacher_data?._id || "")}
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

export default SearchTeacher_ByAdmin;