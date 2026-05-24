import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

function Resend_email()
{

    const [teacheremail, setteacheremail] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() =>
    {
        document.title = "Resend Email";
    }, []);

    async function resendMail(e)
    {
        e.preventDefault()
        try 
        {
            if (!/\S+@\S+\.\S+/.test(teacheremail))
            {
                return toast.error("Invalid email format");
            }
            setloading(true);
            const data = { teacheremail }
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/resendmail`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success(resp.data.msg);
                setteacheremail("")
            }
            else if (resp.data.statuscode === 2)
            {
                toast.warn(resp.data.msg);
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
                        <h2>Resend Activation Mail Form</h2>
                        <form name="form1" onSubmit={resendMail}>
                            <div style={{ marginTop: "20px" }}>

                                <div className="input-container mt-4 ">
                                    <input type="email" name="teacheremail" value={teacheremail} placeholder="" className="input-field" onChange={(e) => setteacheremail(e.target.value)} required />

                                    <label className="input-label">
                                        <span><i className="fa-solid fa-envelope" /></span><span>Register Email</span>
                                    </label>
                                </div><br />

                                <button type="submit" className="register-button " disabled={loading}>
                                    {loading ? "Resending Mail..." : "Resend Mail"}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Resend_email

