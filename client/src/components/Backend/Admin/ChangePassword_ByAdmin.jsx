import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TeacherLogOut } from '../../../reduxslices/teacherSlice';

function ChangePassword_ByAdmin()
{

    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate();

    const { email } = useSelector((state) => state.teacher)

    const [currpass, setcurrpass] = useState("");
    const [newpass, setnewpass] = useState("");
    const [cnewpass, setcnewpass] = useState("");

    const dispatch = useDispatch()

    useEffect(() =>
    {
        document.title = "Change Password"
    }, [])

    async function onchangepassword(e)
    {
        e.preventDefault()
        if (!email?.trim() || !currpass?.trim() || !newpass?.trim() || !cnewpass?.trim())
        {
            return toast.error("All fields are required");
        }
        const apidata = { currpass, newpass, email };
        try
        {
            if (currpass !== newpass)
            {
                if (newpass === cnewpass)
                {
                    if (newpass.trim().length < 3 || cnewpass.trim().length < 3)
                    {
                        return toast.error("New Password must be at least 3 characters");
                    }
                    setloading(true)
                    const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/change_password_by_admin`, apidata, { withCredentials: true });

                    if (resp.data.statuscode === 0)
                    {
                        toast.warn(resp.data.msg)
                    }
                    else if (resp.data.statuscode === 1)
                    {
                        toast.success(resp.data.msg);
                        sessionStorage.clear();
                        navi("/staff_login")
                        dispatch(TeacherLogOut())
                        toast.info("You have been logged out , login with new password");
                    }
                }
                else
                {
                    toast.info("New Password and confirm new password does not match")
                }
            }
            else
            {
                toast.info("Current Password and New Pasword are same")
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
                    <h1 className='hd text-center'>Change Password</h1>

                    <form name="updateform" onSubmit={onchangepassword}>
                        <div className="form-container">

                            <div className="form-group">
                                <label>Current Password</label>
                                <input type="password" name="currpass" placeholder="current password" required=" " onChange={(e) => setcurrpass(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" name="newpass" placeholder="new password" required=" " onChange={(e) => setnewpass(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" name="cnewpass" placeholder="confirm new password" required=" " onChange={(e) => setcnewpass(e.target.value)} />
                            </div>

                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Changing Password..." : "Change Password"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ChangePassword_ByAdmin

