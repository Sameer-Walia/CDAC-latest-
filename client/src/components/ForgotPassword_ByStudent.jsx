import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

function ForgotPassword_ByStudent()
{

    const [studentID, setstudentID] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() =>
    {
        document.title = "Forgot Password";
    }, []);

    async function forgotPassword_by_student(e)
    {
        e.preventDefault()
        try 
        {
            setloading(true);
            const data = { studentID }
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot_password_by_student`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                setstudentID("")
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
                        <form name="form1" onSubmit={forgotPassword_by_student}>
                            <div style={{ marginTop: "20px" }}>

                                <div className="input-container mt-4 ">
                                    <input type="text" name="studentID" value={studentID} placeholder="" className="input-field" onChange={(e) => setstudentID(e.target.value)} required />

                                    <label className="input-label">
                                        <span><i className="fa-solid fa-envelope" /></span><span>Enter your Student ID</span>
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

export default ForgotPassword_ByStudent

