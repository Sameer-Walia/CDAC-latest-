import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";

function AddStudent_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate();
    const { email } = useSelector((state) => state.teacher)

    const [name, setname] = useState("")
    const [studentId, setstudentId] = useState("")
    const [studentemail, setstudentemail] = useState("")
    const [batch, setbatch] = useState("")
    const [course, setCourse] = useState("")
    const [phone, setphone] = useState("")
    const [fathername, setfathername] = useState("")
    const [mothername, setmothername] = useState("")
    const [phone2, setphone2] = useState("")

    useEffect(() =>
    {
        document.title = "Add Student"
    }, [])

    async function AddStudent_byadmin(e)
    {
        e.preventDefault()

        if (phone === phone2) 
        {
            toast.error("Phone Number and Alternative Phone Number cannot be Same")
        }
        else
        {
            if (!name?.trim() || !studentId?.trim() || !email?.trim() || !batch?.trim() || !course?.trim() || !studentemail?.trim() || !phone?.trim() || !fathername?.trim() || !mothername?.trim() || !phone2?.trim())
            {
                return toast.error("All fields are required");
            }
            const reqdata = { name, studentId, email, batch, course, studentemail, phone, fathername, mothername, phone2 }
            try 
            {
                setloading(true)
                const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/add_student_by_admin`, reqdata, { wthCredentials: true })
                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    navi("/all_students_list_to_admin")
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
                    <h1 className="hd text-center">Add Student</h1>

                    <form name="studentform" onSubmit={AddStudent_byadmin}>
                        <div className="student-form">

                            <div className="form-grid">

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Enter student name" required onChange={(e) => setname(e.target.value)} minLength={3} />
                                </div>

                                <div className="form-group">
                                    <label>Student ID</label>
                                    <input type="number" placeholder="Enter student ID" required onChange={(e) => setstudentId(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Enter email" required onChange={(e) => setstudentemail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Select Batch</label>
                                    <select onChange={(e) => setbatch(e.target.value)} required>
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
                                    <select onChange={(e) => setCourse(e.target.value)} required>
                                        <option value="">-- Select Course --</option>
                                        <option value="AI">M.Tech – Artificial Intelligence (AI)</option>
                                        <option value="VLSI">M.Tech - VLSI Design</option>
                                        <option value="ES">M.Tech - Embedded Systems (ES)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Phone No</label>
                                    <input type="text" placeholder="Enter phone number" required onChange={(e) => setphone(e.target.value)} minLength={10} maxLength={10} />
                                </div>

                                <div className="form-group">
                                    <label>Phone No (2)</label>
                                    <input type="text" placeholder="Enter alternate number" required onChange={(e) => setphone2(e.target.value)} minLength={10} maxLength={10} />
                                </div>

                                <div className="form-group">
                                    <label>Father Name</label>
                                    <input type="text" placeholder="Enter father name" required onChange={(e) => setfathername(e.target.value)} minLength={3} />
                                </div>

                                <div className="form-group">
                                    <label>Mother Name</label>
                                    <input type="text" placeholder="Enter mother name" required onChange={(e) => setmothername(e.target.value)} minLength={3} />
                                </div>

                            </div>

                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Adding Student..." : "Add Student"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
}

export default AddStudent_ByAdmin;