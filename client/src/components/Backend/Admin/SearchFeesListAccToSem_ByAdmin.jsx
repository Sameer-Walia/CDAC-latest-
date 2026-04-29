import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function SearchFeesListAccToSem_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [Feeslistdata, setfeesListdata] = useState([]);
    const [semester, setSemester] = useState("");
    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Semester-Wise Fees List"
    }, [])

    useEffect(() =>
    {
        if (semester)
        {
            fetch_feesList_acc_to_semester()
        }
    }, [semester])

    async function fetch_feesList_acc_to_semester()
    {
        try
        {
            setloading(true)

            if (semester === "")
            {
                toast.error("Choose Semester")
                return
            }

            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_feesList_acc_to_semester_by_admin/${semester}`);

            if (resp.data.statuscode === 1)
            {
                setfeesListdata(resp.data.sem_Fees_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setfeesListdata([]);
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
            setloading(true)

            const data = { id, newStatus }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_fees_status`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                fetch_feesList_acc_to_semester()
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
            setloading(true)
            const resp = window.confirm("Are you sure to Delete")

            if (resp === true)
            {
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_1_fees_by_admin/${id}`)

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    fetch_feesList_acc_to_semester()
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
                    <h1 className="hd text-center">Fees List Acc. To Semester</h1>

                    <div className="semester-filter-container">
                        <select
                            className="semester-dropdown"
                            onChange={(e) => setSemester(e.target.value)}
                            required
                        >
                            <option value="">Select Semester</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                            <option value="4">Semester 4</option>
                        </select>
                    </div>

                    {
                        semester &&
                        <div id="teacher_list" className="table-container">
                            <table className="teacher-table mt-4">
                                <thead>
                                    <tr>
                                        <th>S.NO.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>ID</th>
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
                                        Feeslistdata && Feeslistdata.length > 0 ?
                                            Feeslistdata.map((item, index) =>
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.studentID}</td>
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
                    }


                </div>
            </div>
        </div>
    );
}

export default SearchFeesListAccToSem_ByAdmin;