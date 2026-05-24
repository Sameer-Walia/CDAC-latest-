import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

function ForgotPassword_ByTeacher()
{

    const [teacheremail, setteacheremail] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() =>
    {
        document.title = "Forgot Password";
    }, []);

    async function forgotPassword_by_teacher(e)
    {
        e.preventDefault()
        if (!/\S+@\S+\.\S+/.test(teacheremail))
        {
            return toast.error("Invalid email format");
        }
        try 
        {
            setloading(true);
            const data = { teacheremail }
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot_password_by_teacher`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                setteacheremail("")
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
    };

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
                        <h2 className='hd'>Forgot Password</h2>
                        <form name="form1" onSubmit={forgotPassword_by_teacher}>
                            <div style={{ marginTop: "20px" }}>

                                <div className="input-container mt-4 ">
                                    <input type="email" name="teacheremail" value={teacheremail} placeholder="" className="input-field" onChange={(e) => setteacheremail(e.target.value)} required />

                                    <label className="input-label">
                                        <span><i className="fa-solid fa-envelope" /></span><span>Register Email</span>
                                    </label>
                                </div><br />

                                <button type="submit" className="register-button " disabled={loading}>
                                    {loading ? "Sending Mail..." : "Send Mail"}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword_ByTeacher

