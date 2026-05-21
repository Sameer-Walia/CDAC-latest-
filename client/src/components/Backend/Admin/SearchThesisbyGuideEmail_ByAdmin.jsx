import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";

function SearchThesisbyGuideEmail_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [guideemail, setguideemail] = useState("");
    const [student_thesis, setstudent_thesis] = useState([]);
    const navi = useNavigate();

    const [popupData, setpopupData] = useState("");
    const [popupTitle, setpopupTitle] = useState("");
    const [showPopup, setshowPopup] = useState(false);
    const { email } = useSelector((state) => state.teacher)

    useEffect(() =>
    {
        document.title = "Search Student Thesis"
    }, [])

    async function handleSearch()
    {
        try
        {
            if (!guideemail.trim())
            {
                return toast.error("Enter student ID")
            }
            setstudent_thesis([]);
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/search_thesis_by_guideemail_by_admin/${guideemail}`);

            if (resp.data.statuscode === 1)
            {
                setstudent_thesis(resp.data.student_thesis)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setstudent_thesis([]);
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
            const confirmDelete = window.confirm("Are you sure to Delete")

            if (confirmDelete)
            {
                setloading(true)
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_student_thesis_by_admin/${id}`)

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    handleSearch()
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

    async function handleStatusChange(id, newStatus)
    {
        try
        {
            setloading(true)

            const data = { id, newStatus }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_thesis_status_by_admin`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                handleSearch()
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
                    <h1 className="hd text-center">Search Student Thesis</h1>
                    <div className="search-email-box">
                        <input type="text" placeholder="Enter Guide Email..." value={guideemail} onChange={(e) => setguideemail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />

                        <button onClick={handleSearch} disabled={loading}>
                            {loading ? "🔍 Searching..." : "🔍 Search"}
                        </button>
                    </div>
                    <div id="teacher_list" className="table-container">
                        <table className="teacher-table mt-4">
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
                                    <th>Guide Name</th>
                                    <th>Guide Email</th>
                                    <th>Batch</th>
                                    <th>Course</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Title</th>
                                    <th>Domain</th>
                                    <th>Month</th>
                                    <th>AddedOn</th>
                                    <th>View</th>
                                    <th>Status</th>
                                    <th>Change Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {student_thesis && student_thesis.length > 0 ?
                                    student_thesis.map((item, index) =>
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.teacher_name}</td>
                                            <td>
                                                <span
                                                    className="clickable-text"
                                                    onClick={() =>
                                                    {
                                                        setpopupTitle("Guide Email");
                                                        setpopupData(item.teacher_email);
                                                        setshowPopup(true);
                                                    }}
                                                >
                                                    {item.teacher_email.slice(0, 5)}...
                                                </span>
                                            </td>
                                            <td>{item.student_batch}</td>
                                            <td>{item.student_course}</td>
                                            <td>{item.student_ID}</td>
                                            <td>{item.student_name}</td>
                                            <td>
                                                <span
                                                    className="clickable-text"
                                                    onClick={() =>
                                                    {
                                                        setpopupTitle("Thesis Title");
                                                        setpopupData(item.thesis_title);
                                                        setshowPopup(true);
                                                    }}
                                                >
                                                    {item.thesis_title.slice(0, 5)}...
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className="clickable-text"
                                                    onClick={() =>
                                                    {
                                                        setpopupTitle("Domain");
                                                        setpopupData(item.domain);
                                                        setshowPopup(true);
                                                    }}
                                                >
                                                    {item.domain.slice(0, 5)}...
                                                </span>
                                            </td>
                                            <td>{item.month}</td>
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
                                                    href={`${import.meta.env.VITE_API_URL}/uploads/thesis/${item.thesis_pdf}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    View PDF
                                                </a>
                                            </td>
                                            <td>{item.status}</td>
                                            <td>
                                                <select
                                                    className={`status-select ${item.status === "Verified" ? "Verified" : item.status === "Approved" ? "Approved" : "Pending"}`}
                                                    value={item.status}
                                                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Verified">Verified</option>
                                                    <option value="Approved">Approved</option>
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
                                        <td colSpan="15" style={{ textAlign: "center" }}>
                                            No Data Found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        {
                            showPopup &&
                            <div className="popup-overlay">
                                <div className="popup-box">
                                    <h3>{popupTitle}</h3>

                                    <p>{popupData}</p>

                                    <button onClick={() => setshowPopup(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchThesisbyGuideEmail_ByAdmin