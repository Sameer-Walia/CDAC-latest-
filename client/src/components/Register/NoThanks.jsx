import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

function NoThanks()
{

    const [uname, setUname] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
    {
        document.title = "Resend Email";
    }, []);

    async function resendMail(e)
    {
        e.preventDefault()
        try 
        {
            setLoading(true);
            const data = { uname }
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/resendmail`, data);

            if (resp.data.statuscode === 1)
            {
                toast.success("Activation mail resent successfully! , please check your mail");
                setUname("")
            }
            else if (resp.data.statuscode === 2)
            {
                toast.warn("Activation mail not resent successfully!  , error while resending activation mail");
            }
            else if (resp.data.statuscode === 0)
            {
                toast.warn(resp.data.msg)
            }
            else
            {
                toast.error("Some Problem Occured")
            }
        }
        catch (e) 
        {
            toast.error("Error Occured " + e.message)
        }
        finally 
        {
            setLoading(false);
        }
    };

    return (
        <div id="authpage">
            <div className="thanks-page ">
                <div className="thanks-container">
                    <div className="thanks-content">
                        {
                            showForm ? <h2>Resend Activation Mail Form</h2> :
                                <button onClick={() => setShowForm(true)} className="btn btn-primary">
                                    Resend Activation Mail
                                </button>
                        }
                        {
                            showForm ?
                                <form name="form1" onSubmit={resendMail}>
                                    <div style={{ marginTop: "20px" }}>

                                        <div className="input-container mt-4 ">
                                            <input type="email" name="useremail" placeholder="" className="input-field" onChange={(e) => setemail(e.target.value)} required />

                                            <label className="input-label">
                                                <span><i className="fa-solid fa-envelope" /></span><span>Register Email</span>
                                            </label>
                                        </div><br />

                                        {
                                            loading ?
                                                <div className="loader-container">
                                                    <img src="assets/images/loader.gif" alt="loader" className="loader" />
                                                </div> : <input type="submit" name="btn" value="Resend Mail" className="btn btn-success" />
                                        }

                                    </div>
                                </form> : null
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NoThanks

