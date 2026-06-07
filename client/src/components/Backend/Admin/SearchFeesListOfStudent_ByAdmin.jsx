import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function SearchFeesListOfStudent_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [studentid, setstudentid] = useState("");
    const [studentFeeslistdata, setstudentfeesListdata] = useState([]);
    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Student-Wise Fees List"
    }, [])

    async function handleSearch()
    {
        try
        {
            setstudentfeesListdata([]);
            if (!studentid?.trim())
            {
                return toast.error("Enter Student ID")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_feesList_acc_to_studentID_by_admin?sid=${studentid}`, { withCredentials: true });
            if (resp.data.statuscode === 1)
            {
                setstudentfeesListdata(resp.data.student_Fees_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setstudentfeesListdata([]);
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

    async function handleStatusChange(id, newStatus)
    {
        try
        {
            if (!id.trim() || !newStatus.trim())
            {
                return toast.error("All fields required");
            }
            setloading(true)
            const data = { id, newStatus }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_fees_status_by_admin`, data, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                handleSearch();
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
    };

    async function handleDelete(id)
    {
        try
        {
            const confirmdelete = window.confirm("Are you sure to Delete")
            if (confirmdelete)
            {
                setloading(true)
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_1_fees_by_admin/${id}`, { withCredentials: true })

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg);
                    handleSearch();
                }
                else 
                {
                    toast.error(resp.data.msg);
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

            {
                loading && (
                    <div className="overlay">
                        <div>
                            <div className="spinner"></div>
                            <p style={{ color: "white", marginTop: "10px" }}>
                                Please wait...
                            </p>
                        </div>
                    </div>
                )
            }

            <div className="admin_container">

                <AdminSidebar collapse={collapse} setCollapse={setCollapse} />

                <div className={`admin_maincontent ${collapse ? "expand" : ""}`}>

                    <h1 className="hd text-center">Search Student Fees List</h1>

                    <div className="search-email-box">
                        <input type="text" placeholder="Enter Student Id..." value={studentid} onChange={(e) => setstudentid(e.target.value)} required />
                        <button onClick={handleSearch} disabled={loading}>
                            {loading ? "🔍 Searching..." : "🔍 Search"}
                        </button>
                    </div>

                    {
                        studentFeeslistdata.length > 0 ?
                            <div id="teacher_list" className="table-container">
                                <table className="teacher-table mt-4">
                                    <thead>
                                        <tr>
                                            <th>S.NO.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>ID</th>
                                            <th>Batch</th>
                                            <th>Course</th>
                                            <th>Sem</th>
                                            <th>Date</th>
                                            <th>View</th>
                                            <th>Status</th>
                                            <th>Change Status</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            studentFeeslistdata.map((item, index) =>
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.studentID}</td>
                                                    <td>{item.batch}</td>
                                                    <td>{item.course}</td>
                                                    <td>{item.semester}</td>
                                                    <td>
                                                        {new Date(item.Addedon).toLocaleString("en-IN", {
                                                            timeZone: "UTC",
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })}
                                                    </td>
                                                    <td>
                                                        <a
                                                            href={`${import.meta.env.VITE_API_URL}/uploads/fees/${item.fees_pdf}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            View PDF
                                                        </a>
                                                    </td>
                                                    <td>{item.status}</td>
                                                    <td>
                                                        <select
                                                            className={`status-select ${item.status === "Paid" ? "paid" : "pending"}`}
                                                            value={item.status}
                                                            onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Paid">Paid</option>
                                                        </select>
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
                                        }

                                    </tbody>
                                </table>
                            </div> : null
                    }


                </div>
            </div>
        </div>
    );
}

export default SearchFeesListOfStudent_ByAdmin;