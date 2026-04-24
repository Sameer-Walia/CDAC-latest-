import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function UpdateTeacher_ByAdmin()
{
    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const { tid } = useParams();

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [usertype, setusertype] = useState("");

    const navi = useNavigate();


    useEffect(() =>
    {
        document.title = "Update Teacher"
    }, [])

    useEffect(() =>
    {
        if (tid)
        {
            fetch_teacher_data()
        }

    }, [tid])


    async function fetch_teacher_data()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_teacher_data_by_admin/${tid}`);

            if (resp.data.statuscode === 1)
            {
                const teacher = resp.data.teacher_data;
                setname(teacher.name);
                setemail(teacher.email);
                setphone(teacher.phone);
                setusertype(teacher.usertype);
            }
            else 
            {
                toast.warn(resp.data.msg)
                setteacher(null);
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

    async function update_teacher(e)
    {
        e.preventDefault()
        try
        {
            setloading(true)
            const teacher_data = { name, phone, usertype, tid }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_teacher_by_admin`, teacher_data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                navi("/adminpanel")
            }
            else 
            {
                toast.warn(resp.data.msg)
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

                    <h1 className="hd text-center">Update Teachers</h1>


                    <form name="updateform" onSubmit={update_teacher}>
                        <div className="form-container">

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Enter teacher name" value={name || ""}
                                    required onChange={(e) => setname(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" disabled placeholder="Enter email" value={email || ""}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" placeholder="Enter phone number" value={phone || ""}
                                    required onChange={(e) => setphone(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>User Type</label>
                                <select value={usertype || ""} onChange={(e) => setusertype(e.target.value)} required>
                                    <option value="">Select user type</option>
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="normal">Normal</option>
                                </select>
                            </div>

                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Updating Teacher..." : "Update Teacher"}
                            </button>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default UpdateTeacher_ByAdmin;