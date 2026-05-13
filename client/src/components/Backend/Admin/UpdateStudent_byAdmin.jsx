import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function UpdateStudent_byAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);

    const [name, setname] = useState("")
    const [studentId, setstudentId] = useState("")
    const [studentpassword, setstudentpassword] = useState("")
    const [studentemail, setstudentemail] = useState("")
    const [batch, setbatch] = useState("")
    const [course, setCourse] = useState("")
    const [phone, setphone] = useState("")
    const [fathername, setfathername] = useState("")
    const [mothername, setmothername] = useState("")
    const [phone2, setphone2] = useState("")

    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Update Student"
    }, [])

    const { sid } = useParams()

    useEffect(() =>
    {
        if (sid)
        {
            fetch_student_data_byAdmin()
        }
    }, [sid])

    async function fetch_student_data_byAdmin()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_student_data_by_Admin/${sid}`);

            if (resp.data.statuscode === 1)
            {
                const student = resp.data.student_data;
                setname(student.name);
                setstudentId(student.studentID)
                setstudentpassword(student.password)
                setstudentemail(student.email);
                setbatch(student.batch);
                setCourse(student.course);
                setphone(student.phone);
                setphone2(student.phone2);
                setfathername(student.father);
                setmothername(student.mother);
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

    async function UpdateStudent_byAdmin(e)
    {
        e.preventDefault()
        try
        {
            setloading(true)
            const student_data = { name, phone, phone2, batch, course, sid, fathername, mothername, studentemail }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_student_data_by_admin`, student_data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                navi("/all_students_list_to_admin")
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

    async function sendmail(e)
    {
        e.preventDefault()
        try
        {
            setloading(true)
            const student_data_for_email = { name, studentpassword, studentemail, studentId }
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/send_mail_to_student_by_admin`, student_data_for_email);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
            }
            else if (resp.data.statuscode === 2)
            {
                toast.error(resp.data.msg)
            }
            else 
            {
                toast.error(resp.data.msg)
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
                    <h1 className="hd text-center">Update Student</h1>

                    <form name="updateform" onSubmit={UpdateStudent_byAdmin}>
                        <div className="form-container">

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Enter student name" value={name || ""}
                                    required onChange={(e) => setname(e.target.value)} minLength={3} />
                            </div>

                            <div className="form-group">
                                <label>Student ID</label>
                                <input type="text" disabled placeholder="Enter Student id" value={studentId || ""}
                                    required />
                            </div>

                            <div className="form-group">
                                <label>Student Password</label>
                                <input type="text" disabled placeholder="Enter Student Password" value={studentpassword || ""}
                                    required />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Enter student email" value={studentemail || ""}
                                    onChange={(e) => setstudentemail(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Select Batch</label>
                                <select onChange={(e) => setbatch(e.target.value)} value={batch || ""} required>
                                    <option value="">-- Select Batch --</option>
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

                            <div className="form-group">
                                <label>Select Course</label>
                                <select onChange={(e) => setCourse(e.target.value)} value={course || ""} required>
                                    <option value="">-- Select Course --</option>
                                    <option value="AI">M.Tech – Artificial Intelligence (AI)</option>
                                    <option value="VLSI">M.Tech - VLSI Design</option>
                                    <option value="ES">M.Tech - Embedded Systems (ES)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" placeholder="Enter phone number" value={phone || ""}
                                    required onChange={(e) => setphone(e.target.value)} minLength={10} maxLength={10} />
                            </div>

                            <div className="form-group">
                                <label>Alternative Phone</label>
                                <input type="text" placeholder="Enter phone number" value={phone2 || ""}
                                    required onChange={(e) => setphone2(e.target.value)} minLength={10} maxLength={10} />
                            </div>

                            <div className="form-group">
                                <label>Father Name</label>
                                <input type="text" placeholder="Enter phone number" value={fathername || ""}
                                    required onChange={(e) => setfathername(e.target.value)} minLength={3} />
                            </div>

                            <div className="form-group">
                                <label>Mother Name</label>
                                <input type="text" placeholder="Enter phone number" value={mothername || ""}
                                    required onChange={(e) => setmothername(e.target.value)} minLength={3} />
                            </div>

                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Updating Student..." : "Update Student"}
                            </button>

                            <button type="button" onClick={sendmail} className="register-button mt-3" disabled={loading}>
                                {loading ? "Sending Mail..." : "Send Mail"}
                            </button>

                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
}

export default UpdateStudent_byAdmin;