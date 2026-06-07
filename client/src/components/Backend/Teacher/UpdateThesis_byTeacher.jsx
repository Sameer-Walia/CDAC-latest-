import React, { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";

function UpdateThesis_byTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);

    const [teacheremail, setteacheremail] = useState("");
    const [teachername, setteachername] = useState("");
    const [title, settitle] = useState("");
    const [isTitleLocked, setisTitleLocked] = useState(false);
    const [description, setdescription] = useState("");
    const [month, setmonth] = useState("");
    const [remarks, setremarks] = useState("");
    const [status, setstatus] = useState("");
    const [studentname, setstudentname] = useState("");
    const [studentid, setstudentid] = useState("");
    const [studentbatch, setstudentbatch] = useState("");
    const [studentcourse, setstudentcourse] = useState("");
    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Update Thesis"
    }, [])

    const { tid } = useParams()

    useEffect(() =>
    {
        if (tid)
        {
            fetch_student_thesis_byTeacher()
        }
    }, [tid])

    async function fetch_student_thesis_byTeacher()
    {
        try
        {
            if (!tid?.trim())
            {
                return toast.error("Cannot Fetch Student Thesis")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_student_thesis_by_Teacher/${tid}`, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                const thesis = resp.data.student_thesis;
                setteacheremail(thesis.teacher_email);
                setteachername(thesis.teacher_name);
                settitle(thesis.thesis_title);
                setdescription(thesis.description);
                setmonth(thesis.month);
                setremarks(thesis.remarks);
                setstatus(thesis.status)
                setstudentname(thesis.student_name)
                setstudentid(thesis.student_ID)
                setstudentbatch(thesis.student_batch)
                setstudentcourse(thesis.student_course)
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
    }

    async function UpdateThesis_byTeacher(e)
    {
        e.preventDefault()
        try
        {
            if (!tid?.trim() || !title?.trim() || !description?.trim() || !remarks?.trim())
            {
                return toast.error("All fields are required");
            }

            setloading(true)
            const student_thesis = { tid, title, description, remarks }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_student_thesis_by_teacher`, student_thesis, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                navi("/all_thesis_list_to_teacher")
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

    }


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
                    <h1 className="hd text-center">Update Student Thesis</h1>

                    <form name="Thesis Form" onSubmit={UpdateThesis_byTeacher}>
                        <div className="attendance-filter-box">

                            <div className="filter-group">
                                <label>Guide Email</label>
                                <input type="text" value={teacheremail || ""} placeholder="Guide Email" disabled />
                            </div>

                            <div className="filter-group">
                                <label>Guide Name</label>
                                <input type="text" value={teachername || ""} placeholder="Guide Name" disabled />
                            </div>

                            <div className="filter-group">
                                <label>Student Batch</label>
                                <input type="text" value={studentbatch || ""} placeholder="student batch" disabled />
                            </div>

                            <div className="filter-group">
                                <label>Student Course</label>
                                <input type="text" value={studentcourse || ""} placeholder="student course" disabled />
                            </div>

                            <div className="filter-group">
                                <label>Student Name</label>
                                <input type="text" value={studentname || ""} placeholder="student name" disabled />
                            </div>

                            <div className="filter-group">
                                <label>Student ID</label>
                                <input type="text" value={studentid || ""} placeholder="student id" disabled />
                            </div>

                            <div className="filter-group">
                                <label>Month</label>
                                <input type="text" value={month || ""} placeholder="Month" disabled />
                            </div>

                            <div className="filter-group">
                                <label>Thesis Title </label>
                                <input type="text" value={title || ""} onChange={(e) => settitle(e.target.value)} placeholder="Enter Thesis Title" required />
                            </div>

                            <div className="filter-group">
                                <label>Description</label>
                                <input type="text" value={description || ""} onChange={(e) => setdescription(e.target.value)} placeholder="Enter Description " required />
                            </div>

                            <div className="filter-group">
                                <label>Remarks</label>
                                <input type="text" value={remarks || ""} onChange={(e) => setremarks(e.target.value)} placeholder="Enter Remarks " required />
                            </div>


                            <button type="submit" className="register-button my-2" disabled={loading}>
                                {loading ? "Updating Thesis..." : "Update Thesis"}
                            </button>

                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
}

export default UpdateThesis_byTeacher;