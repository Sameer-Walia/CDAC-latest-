import React from 'react'
import { useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

function AddTimeTable_ByTeacher()
{
    const [loading, setloading] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [pdf, setPdf] = useState(null);
    const fileInputRef = useRef(null);   // for cancel

    const { email } = useSelector((state) => state.teacher)


    const navi = useNavigate()

    useEffect(() =>
    {
        document.title = "Time-Tablle upload"
    }, [])

    async function addtimeTable(e)
    {
        e.preventDefault();
        try
        {
            if (!course?.trim() || !semester?.trim() || !email?.trim())
            {
                return toast.error("All fields are required");
            }
            setloading(true);
            const formData = new FormData();
            formData.append("course", course);
            formData.append("semester", semester);
            formData.append("email", email);
            if (pdf != null)
            {
                formData.append("pdf", pdf)
            }

            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/add_timetable_by_teacher`, formData, { withCredentials: true })

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                setCourse("");
                setSemester("");
                setPdf(null);
                if (fileInputRef.current) 
                {
                    fileInputRef.current.value = ''; // Reset the value to clear the input
                }
                navi("/all_timetable_list_to_teacher")
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
                        <h1 className="hd text-center">Add Time-Table</h1>

                        <form name="syllabusform" onSubmit={addtimeTable}>
                            <div className="student-form">

                                <div className="form-grid">

                                    <div className="form-group">
                                        <label>Course</label>
                                        <select
                                            value={course}
                                            onChange={(e) =>
                                            {
                                                setCourse(e.target.value);
                                                setSemester("");
                                            }}
                                            required
                                        >
                                            <option value="">Select Course</option>
                                            <option value="AI"> M.Tech – Artificial Intelligence (AI)</option>
                                            <option value="VLSI">M.Tech - VLSI Design</option>
                                            <option value="ES"> M.Tech - Embedded Systems (ES)</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Semester</label>
                                        <select
                                            value={semester}
                                            onChange={(e) =>
                                            {
                                                setSemester(e.target.value);
                                            }}
                                            required
                                        >
                                            <option value="">Select Semester</option>
                                            <option value="1">Semester 1</option>
                                            <option value="2">Semester 2</option>
                                            <option value="3">Semester 3</option>
                                        </select>
                                    </div>


                                    <div className="form-group">
                                        <label>Upload TimeTable Pdf</label>
                                        <input type="file" accept="application/pdf" required ref={fileInputRef}
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

                                </div>

                                <button type="submit" className="register-button mt-3" disabled={loading}>
                                    {loading ? "Adding Time-Table..." : "Add Time-Table"}
                                </button>
                            </div>
                        </form>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddTimeTable_ByTeacher
