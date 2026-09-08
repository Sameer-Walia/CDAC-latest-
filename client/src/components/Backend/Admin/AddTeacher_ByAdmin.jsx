import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";

function AddTeacher_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate();


    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [cpass, setcpass] = useState("")


    useEffect(() =>
    {
        document.title = "Add Teacher"
    }, [])

    async function addTeacherbyadmin(e)
    {
        e.preventDefault()

        if (pass === cpass) 
        {
            if (!name?.trim() || !phone?.trim() || !email?.trim() || !pass?.trim())
            {
                return toast.error("All fields are required");
            }

            if (name.trim().length < 3)
            {
                return toast.error("Name must be at least 3 characters");
            }

            if (!/^[0-9]{10}$/.test(phone))
            {
                return toast.error("Phone must be 10 digits");
            }

            if (!/\S+@\S+\.\S+/.test(email))
            {
                return toast.error("Invalid email format");
            }

            if (pass.length < 3)
            {
                return toast.error("Password must be at least 3 characters");
            }
            const reqdata = { name, phone, email, pass }
            try 
            {
                setloading(true)
                const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/add_teacher_by_admin`, reqdata , {withCredentials:true})
                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg)
                    navi("/adminPanel")
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
        else
        {
            toast.error("Password and Confirm Password Doesnot Match")
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
                    <h1 className="hd text-center">Add Teacher</h1>

                    <form name="studentform" onSubmit={addTeacherbyadmin}>
                        <div className="student-form">

                            <div className="form-grid">

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Enter Teacher name" required onChange={(e) => setname(e.target.value)} minLength={3} />
                                </div>

                                <div className="form-group">
                                    <label>Phone No</label>
                                    <input type="text" placeholder="Enter phone number" required onChange={(e) => setphone(e.target.value)} minLength={10} maxLength={10} />
                                </div>


                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Enter Teacher email" required onChange={(e) => setemail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="Enter Teacher Password" required onChange={(e) => setpass(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" placeholder="Confirm Teacher Password" required onChange={(e) => setcpass(e.target.value)} />
                                </div>

                            </div>

                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Adding Teacher..." : "Add Teacher"}
                            </button>

                            <button onClick={() => navi("/resend_email")} className="register-button mt-3" disabled={loading}>
                                {loading ? "Resending Mail..." : "Resend Mail"}
                            </button>

                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
}

export default AddTeacher_ByAdmin;

