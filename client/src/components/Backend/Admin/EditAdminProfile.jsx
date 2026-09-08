import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Admin.css";


function EditAdminProfile()
{

    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate();

    const { email } = useSelector((state) => state.teacher)

    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [usertype, setusertype] = useState("")
    const [adminemail, setadminemail] = useState("")

    useEffect(() =>
    {
        document.title = "Edit Profile"
    }, [])

    useEffect(() =>
    {
        if (email)
        {
            fetchadminprofile()
        }
    }, [email])

    async function fetchadminprofile()
    {
        try 
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_admin_profile/${email}`, { withCredentials: true })
            if (resp.data.statuscode === 1)
            {
                const profile = resp.data.profile
                setname(profile?.name)
                setphone(profile?.phone)
                setadminemail(profile?.email)
                setusertype(profile?.usertype)
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

    async function update_admin_profile(e)
    {
        e.preventDefault()
        try
        {
            setloading(true)
            const profile_data = { name, phone, email }
            const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/update_admin_profile `, profile_data, { withCredentials: true });

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg)
                navi("/adminprofile")
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
                    <h1 className='hd text-center'>Edit Profile</h1>

                    <form name="updateform" onSubmit={update_admin_profile}>
                        <div className="form-container">

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Enter Your name" value={name || ""}
                                    required onChange={(e) => setname(e.target.value)} minLength={3} />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" disabled placeholder="Enter Your email" value={adminemail || ""}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" placeholder="Enter Your phone number" value={phone || ""}
                                    required onChange={(e) => setphone(e.target.value)} minLength={10} maxLength={10} />
                            </div>

                            <div className="form-group">
                                <label>User Type</label>
                                <select value={usertype || ""} disabled onChange={(e) => setusertype(e.target.value)} required>
                                    <option value="">Select user type</option>
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="normal">Normal</option>
                                </select>
                            </div>

                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Updating Profile..." : "Update Profile"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default EditAdminProfile

