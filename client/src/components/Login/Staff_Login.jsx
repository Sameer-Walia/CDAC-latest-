import React, { useEffect, useState } from 'react'
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';
import { TeacherLogin } from "../../reduxslices/teacherSlice";

function Staff_Login()
{

    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [loading, setloading] = useState(false);
    const [hcaptcha, sethcaptcha] = useState(false);
    const dispatch = useDispatch()


    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Login Page"
    }, [])

    function onChange(value) 
    {
        console.log("Captcha value:", value);
        if (value === null || value === "")
        {
            sethcaptcha(false)
        }
        else
        {
            sethcaptcha(true)
        }
    }

    async function onlogin(e) 
    {
        e.preventDefault()
        const logindata = { email, pass };
        try 
        {
            setloading(true)
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/staff_login`, logindata)
            if (resp.data.statuscode === 1) 
            {
                dispatch(TeacherLogin(resp.data.teacherdata))
                sessionStorage.setItem("teacherdata", JSON.stringify(resp.data.teacherdata));
                if (resp.data.teacherdata.usertype === "admin")
                {
                    toast.success(resp.data.msg)
                    navi("/adminhome")
                }
                else if (resp.data.teacherdata.usertype === "teacher")
                {
                    toast.success(resp.data.msg)
                    navi("/teacherhome")
                }
                else
                {
                    toast.success(resp.data.msg)
                    navi("/")
                }
            }
            else 
            {
                toast.error(resp.data.msg)
                cancel()
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

    function cancel()
    {
        setemail("");
        setpass("")
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

            <form onSubmit={onlogin} className="register-form ">

                <div className="input-container mt-5 ">

                    <input type="email" name="useremail" placeholder="" value={email} onChange={(e) => setemail(e.target.value)} className="input-field" required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-envelope" /></span><span>Email</span>
                    </label>

                </div>

                <div className="input-container mt-4 ">

                    <input type="password" name="userpass" placeholder="" value={pass} onChange={(e) => setpass(e.target.value)} className="input-field" required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-lock" /></span><span>Password</span>
                    </label>
                </div>

                <br />
                <div className="captcha-container"><ReCAPTCHA sitekey="6LfERsgrAAAAALuRJGrIb-al3osvxot0jCNfyLgU" onChange={onChange} /></div>

                <button type="submit" className="register-button mt-3" disabled={loading}>
                    {loading ? "Signing in..." : "SIGN IN"}
                </button>

                <p className="register-text ">
                    New Here? <Link to="/staff_register" className="login-link" >Sign Up</Link>
                </p>
                <Link to="/forgotpassword" className="login-link" >Forgot Password</Link>

            </form>

        </div>
    )
}

export default Staff_Login
