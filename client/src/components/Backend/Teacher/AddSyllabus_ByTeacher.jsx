import React from 'react'
import { useEffect } from 'react'
import TeacherSidebar from './TeacherSidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

function AddSyllabus_ByTeacher()
{
    const [loading, setloading] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [subjectname, setsubjectname] = useState("")
    const [pdf, setPdf] = useState(null);
    const fileInputRef = useRef(null);   // for cancel

    const { email } = useSelector((state) => state.teacher)

    const navi = useNavigate()

    useEffect(() =>
    {
        document.title = "Syllabus-upload"
    }, [])

    async function addsyllabus(e)
    {
        e.preventDefault();
        try
        {
            setloading(true);

            const formData = new FormData();
            formData.append("subjectname", subjectname);
            formData.append("email", email);
            if (pdf != null)
            {
                formData.append("pdf", pdf)
            }

            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/add_syllabus_by_teacher`, formData)

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                setsubjectname("");
                setPdf(null);
                if (fileInputRef.current) 
                {
                    fileInputRef.current.value = ''; // Reset the value to clear the input
                }
                navi("/all_syllabus_list_to_teacher")
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
                        <h1 className="hd text-center">Add Syllabus</h1>

                        <form name="syllabusform" onSubmit={addsyllabus}>
                            <div className="student-form">

                                <div className="form-grid">

                                    <div className="form-group">
                                        <label>Subject Name</label>
                                        <input type="text" placeholder="Enter subject name" value={subjectname} required onChange={(e) => setsubjectname(e.target.value)} minLength={2} />
                                    </div>


                                    <div className="form-group">
                                        <label>Upload Syllabus Pdf</label>
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
                                    {loading ? "Adding Syllabus..." : "Add Syllabus"}
                                </button>
                            </div>
                        </form>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddSyllabus_ByTeacher
