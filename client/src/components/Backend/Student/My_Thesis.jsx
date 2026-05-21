import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import "./student.css";


function My_Thesis()
{

    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate()

    const { batch, course, studentID, name } = useSelector((state) => state.student)
    const [allteacheremail, setallteacheremail] = useState([]);
    const [teacheremail, setteacheremail] = useState("");
    const [teachername, setteachername] = useState("");
    const [title, settitle] = useState("");
    const [isTitleLocked, setisTitleLocked] = useState(false);
    const [domain, setdomain] = useState("");
    const [month, setmonth] = useState("");
    const [pdf, setPdf] = useState(null);
    const fileInputRef = useRef(null);

    const [popupData, setpopupData] = useState("");
    const [popupTitle, setpopupTitle] = useState("");
    const [showPopup, setshowPopup] = useState(false);

    const [mythesistable, setmythesistable] = useState([]);


    useEffect(() =>
    {
        document.title = "Upload Thesis"
    }, [])

    useEffect(() =>
    {
        fetchteacheremail()
    }, [])

    async function fetchteacheremail()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetchTeacheremail`);

            if (resp.data.statuscode === 1)
            {
                setallteacheremail(resp.data.allteacher_email)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setallteacheremail([])
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

    useEffect(() =>
    {
        if (studentID)
        {
            fetchthesisTitle()
        }
    }, [studentID])

    async function fetchthesisTitle()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_thesis_Title_by_student?sid=${studentID}`);

            if (resp.data.statuscode === 1)
            {
                settitle(resp.data.thesis_title);
                setisTitleLocked(true);
            }
            else 
            {
                settitle("");
                setisTitleLocked(false);
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

    async function submit_monthly_thesis_proof(e)
    {
        e.preventDefault();
        try
        {
            if (!teacheremail?.trim() || !teachername?.trim() || !title?.trim() || !domain?.trim() || !month?.trim())
            {
                return toast.error("All fields are required");
            }
            if (!pdf)
            {
                return toast.error("Please upload PDF");
            }
            if (pdf.type !== "application/pdf")
            {
                return toast.error("Only PDF files are allowed");
            }
            if (pdf.size > 3 * 1024 * 1024)
            {
                return toast.error("PDF size must be below 3 MB");
            }
            if (pdf.size === 0)
            {
                return toast.error("Uploaded PDF is empty");
            }

            setloading(true);

            const formData = new FormData();
            formData.append("teacheremail", teacheremail);
            formData.append("teachername", teachername);
            formData.append("title", title);
            formData.append("domain", domain);
            formData.append("month", month);

            formData.append("batch", batch);
            formData.append("course", course);
            formData.append("studentID", studentID);
            formData.append("name", name);

            if (pdf != null)
            {
                formData.append("pdf", pdf)
            }

            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload_thesis_by_student`, formData)

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                setteacheremail("");
                setteachername("");
                settitle("");
                setdomain("");
                setmonth("");
                setPdf(null);
                if (fileInputRef.current) 
                {
                    fileInputRef.current.value = '';
                }
                fetchthesisTitle();
                fetchmythesisDetailsTable()
            }
            else
            {
                toast.error(resp.data.msg);
            }

        }
        catch (e)
        {
            toast.error("Error Occured : " + (e.response?.data?.msg || e.message))
        }
        finally
        {
            setloading(false);
        }
    }

    useEffect(() =>
    {
        if (studentID)
        {
            fetchmythesisDetailsTable()
        }
    }, [studentID])

    async function fetchmythesisDetailsTable()
    {
        try
        {
            if (!studentID?.trim())
            {
                return toast.error("Invalid Student ID")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_my_ThesisTable_by_student/${studentID}`);

            if (resp.data.statuscode === 1)
            {
                setmythesistable(resp.data.mythesis_table)
            }
            else 
            {
                setmythesistable([]);
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
                        <span className="crumb active">Thesis</span>
                    </div>
                </div>

                <h1 className="text-center  hd">Thesis</h1>

                <form name="Thesis Form" onSubmit={submit_monthly_thesis_proof}>
                    <div className="attendance-filter-box">

                        <div className="filter-group">
                            <label>Guide Email</label>
                            <select
                                value={teacheremail}
                                onChange={(e) =>
                                {
                                    const selectedEmail = e.target.value;
                                    setteacheremail(selectedEmail);

                                    const selectedTeacher = allteacheremail.find(
                                        (item) => item.email === selectedEmail
                                    );

                                    setteachername(selectedTeacher?.name || "");
                                }}
                                required
                            >
                                <option value="">Select Guide Email</option>

                                {
                                    allteacheremail && allteacheremail.length > 0 ?
                                        allteacheremail.map((item, index) =>
                                            <option key={index} value={item.email}>
                                                {item.email}
                                            </option>
                                        ) : null
                                }
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Guide Name</label>
                            <input type="text" value={teachername} placeholder="Guide Name" disabled />
                        </div>

                        <div className="filter-group">
                            <label>Thesis Title
                                <span style={{ color: "red", fontSize: "12px", marginLeft: "8px" }}>
                                    (Locked after submit)
                                </span>
                            </label>
                            <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Enter Thesis Title" required readOnly={isTitleLocked}
                                style={{
                                    backgroundColor: isTitleLocked ? "#f1f1f1" : "white",
                                    cursor: isTitleLocked ? "not-allowed" : "text"
                                }}
                            />
                        </div>

                        <div className="filter-group">
                            <label>Domain</label>
                            <input type="text" value={domain} onChange={(e) => setdomain(e.target.value)} placeholder="Enter Domain " required />
                        </div>

                        <div className="filter-group">
                            <label>Month</label>
                            <select
                                value={month}
                                onChange={(e) => setmonth(e.target.value)}
                                required
                            >
                                <option value="">Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Upload PDF
                                <span style={{ color: "red", fontSize: "12px", marginLeft: "8px" }}>
                                    (PDF max size: 3 MB)
                                </span>
                            </label>
                            <input type="file" accept="application/pdf" ref={fileInputRef} required
                                onChange={(e) =>
                                {
                                    const file = e.target.files[0];

                                    if (!file) return;

                                    if (file.type !== "application/pdf")
                                    {
                                        toast.error("Only PDF file allowed");
                                        fileInputRef.current.value = "";
                                        return;
                                    }

                                    if (file.size > 3 * 1024 * 1024)
                                    {
                                        toast.error("File size must be less than 3MB");
                                        fileInputRef.current.value = "";
                                        return;
                                    }

                                    setPdf(file);
                                }}
                            />
                        </div>

                        <button type="submit" className="register-button my-2" disabled={loading}>
                            {loading ? "Uploading Thesis..." : "Upload Thesis"}
                        </button>

                    </div>
                </form>

                <div className="pt-5">
                    <div className="text-center">
                        <h1 className="progress-title">Progress Report</h1>
                    </div>
                    <div id="student_marks_table" className="table-responsive mt-4">
                        <table className="table custom-table text-center align-middle">
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
                                    <th>Guide Name</th>
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
                                </tr>
                            </thead>
                            <tbody>
                                {mythesistable && mythesistable.length > 0 ?
                                    mythesistable.map((item, index) =>
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.teacher_name}</td>
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
                                            <td>
                                                <span className={`status-select ${item.status}`}>
                                                    {item.status}
                                                </span>
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

            <Footer />

        </div>
    )
}

export default My_Thesis
