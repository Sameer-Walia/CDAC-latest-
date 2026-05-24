import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPassword_ByTeacher()
{

    const [loading, setloading] = useState(false);
    const navi = useNavigate();

    const [newpass, setnewpass] = useState("");
    const [cnewpass, setcnewpass] = useState("");
    const [flag, setflag] = useState(false);
    const { code } = useParams()

    useEffect(() =>
    {
        document.title = "Reset Password"
    }, [])

    useEffect(() =>
    {
        if (code)
        {
            verifytoken()
        }
    }, [code])

    async function verifytoken()
    {
        try
        {
            if (!code)
            {
                return toast.error("Code not found")
            }
            setloading(true);
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/checktoken/${code}`)
            if (resp.data.statuscode === 1)
            {
                setflag(true)
            }
            else 
            {
                setflag(false)
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


    async function onresetpassword(e)
    {
        e.preventDefault()
        if (!newpass?.trim() || !cnewpass?.trim())
        {
            return toast.error("All fields are required");
        }
        if (newpass.length < 3)
        {
            return toast.error("Password must be at least 3 characters");
        }

        if (cnewpass.length < 3)
        {
            return toast.error("Confirm Password must be at least 3 characters");
        }
        try
        {
            if (newpass === cnewpass)
            {
                const apidata = { newpass, code };
                setloading(true)
                const resp = await axios.put(`${import.meta.env.VITE_API_URL}/api/reset_password_by_teacher`, apidata);

                if (resp.data.statuscode === 1)
                {
                    toast.success(resp.data.msg);
                    sessionStorage.clear();
                    navi("/staff_login")
                    toast.info("You have been logged out , login with new password");
                }
                else
                {
                    toast.warn(resp.data.msg)
                }
            }
            else
            {
                toast.info("New Password and confirm new password does not match")
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
        <div id="authpage">

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

            <div className="thanks-page ">
                <div className="thanks-container">
                    <div className="thanks-content">
                        <h2 className='hd text-center'>Reset Password</h2>
                        {
                            flag ?
                                <form name="form1" onSubmit={onresetpassword}>
                                    <div style={{ marginTop: "20px" }}>

                                        <div className="input-container mt-4 ">
                                            <input type="password" name="newpass" value={newpass} placeholder="" className="input-field" onChange={(e) => setnewpass(e.target.value)} required />

                                            <label className="input-label">
                                                <span><i className="fa-solid fa-envelope" /></span><span>New Password</span>
                                            </label>
                                        </div><br />

                                        <div className="input-container ">
                                            <input type="password" name="cnewpass" value={cnewpass} placeholder="" className="input-field" onChange={(e) => setcnewpass(e.target.value)} required />

                                            <label className="input-label">
                                                <span><i className="fa-solid fa-envelope" /></span><span>Confirm New Password</span>
                                            </label>
                                        </div><br />

                                        <button type="submit" className="register-button " disabled={loading}>
                                            {loading ? "Reseting Password..." : "Reset Password"}
                                        </button>


                                    </div>
                                </form>
                                : <h2>Invalid Token or Token expired</h2>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword_ByTeacher



