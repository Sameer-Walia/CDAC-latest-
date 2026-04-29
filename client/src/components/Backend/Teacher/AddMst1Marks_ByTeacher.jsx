import React, { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TeacherSidebar from "./TeacherSidebar";

function AddMst1Marks_ByTeacher()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);

    const [type, settype] = useState("MST-1");
    const [studentID, setStudentID] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [obtainedMarks, setObtainedMarks] = useState("");

    const navi = useNavigate();
    const { email } = useSelector((state) => state.teacher)

    useEffect(() =>
    {
        document.title = "Upload Marks"
    }, [])

    async function handleSubmit(e) 
    {
        e.preventDefault();

        if (!studentID || !subjectCode || !obtainedMarks || !email || !type)
        {
            toast.error("All fields are required");
            return;
        }

        if (Number(obtainedMarks) > 24)
        {
            toast.error("Obtained marks cannot be greater than total marks");
            return;
        }

        try
        {
            setloading(true);

            const data = { studentID, subjectCode, obtainedMarks, email, type }

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/add_mst_marks_by_teacher`, data);

            if (res.data.statuscode === 1)
            {
                toast.success(res.data.msg);
                setStudentID("");
                setSubjectCode("");
                setObtainedMarks("");
                navi("/all_students_marks_list_to_teacher")
            }
            else
            {
                toast.error(res.data.msg);
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
                    <h1 className="hd text-center">Add Mst-1 Marks</h1>

                    <form onSubmit={handleSubmit} className="marksForm_container">

                        <div className="marksForm_group">
                            <input type="text" placeholder=" " value={studentID} onChange={(e) => setStudentID(e.target.value)} className="marksForm_input" required />
                            <label className="marksForm_label">Student ID</label>
                        </div>

                        <div className="marksForm_group">
                            <input type="text" placeholder=" " value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} className="marksForm_input" required />
                            <label className="marksForm_label">Subject Code</label>
                        </div>

                        <div className="marksForm_group">
                            <input type="number" placeholder=" " value={24} className="marksForm_input" disabled />
                            <label className="marksForm_label">Total Marks</label>
                        </div>

                        <div className="marksForm_group">
                            <input type="tel" placeholder=" " value={obtainedMarks} onChange={(e) => setObtainedMarks(e.target.value)} className="marksForm_input" required />
                            <label className="marksForm_label">Obtained Marks</label>
                        </div>

                        <button type="submit" className="marksForm_button">
                            Submit Marks
                        </button>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddMst1Marks_ByTeacher;