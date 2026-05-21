import React, { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useSelector } from "react-redux";

function SearchThesisbyBatchCourse_ByTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const [studentid, setstudentid] = useState("");
    const [student_thesis, setstudent_thesis] = useState([]);
    const navi = useNavigate();

    const [popupData, setpopupData] = useState("");
    const [popupTitle, setpopupTitle] = useState("");
    const [showPopup, setshowPopup] = useState(false);
    const { email } = useSelector((state) => state.teacher)

    const [batch, setbatch] = useState("")
    const [course, setCourse] = useState("");

    useEffect(() =>
    {
        document.title = "Search Student Thesis"
    }, [])

    useEffect(() =>
    {
        if (batch, course)
        {
            fetchThesis_acctoBatchCourse()
        }
    }, [batch, course])

    async function fetchThesis_acctoBatchCourse()
    {
        try
        {
            if (!batch)
            {
                return toast.error("Select Batch ")
            }
            if (!course)
            {
                return toast.error("Select Course")
            }
            setstudent_thesis([]);
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/search_thesis_by_BatchCourse_by_teacher/${batch}/${course}/${email}`);

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
            setloading(true)
            const resp = window.confirm("Are you sure to Delete")

            if (resp === true)
            {
                const resp = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete_student_thesis_by_teacher/${id}`)

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    fetchThesis_acctoBatchCourse()
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
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_thesis_status_by_teacher`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                fetchThesis_acctoBatchCourse()
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
                    <h1 className="hd text-center">Search Student Thesis</h1>

                    <div className="attendance-filter-box">
                        <div className="filter-group">
                            <label>Batch</label>
                            <select
                                onChange={(e) =>
                                {
                                    setbatch(e.target.value)
                                    setCourse("");
                                }}
                                required>
                                <option value="">Select Batch</option>
                                <option value="2025-2027">2025-2027</option>
                                <option value="2026-2028">2026-2028</option>
                                <option value="2027-2029">2027-2029</option>
                                <option value="2028-2030">2028-2030</option>
                                <option value="2029-2031">2029-2031</option>
                                <option value="2030-2032">2030-2032</option>
                                <option value="2031-2033">2031-2033</option>
                                <option value="2032-2034">2032-2034</option>
                                <option value="2033-2035">2033-2035</option>
                                <option value="2034-2036">2034-2036</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Course</label>
                            <select
                                value={course}
                                onChange={(e) =>
                                {
                                    setCourse(e.target.value);
                                }}
                                required
                            >
                                <option value="">Select Course</option>
                                <option value="AI"> M.Tech – Artificial Intelligence (AI)</option>
                                <option value="VLSI">M.Tech - VLSI Design</option>
                                <option value="ES"> M.Tech - Embedded Systems (ES)</option>
                            </select>
                        </div>
                    </div>

                    <div id="teacher_list" className="table-container">
                        <table className="teacher-table mt-4">
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
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

export default SearchThesisbyBatchCourse_ByTeacher