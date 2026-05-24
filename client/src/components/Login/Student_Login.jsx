import React, { useEffect, useState } from 'react'
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { StudentLogin } from '../../reduxslices/studentSlice';

function Student_Login()
{

    const [studentID, setstudentID] = useState("");
    const [pass, setpass] = useState("");
    const [loading, setloading] = useState(false);
    const [captchaToken, setcaptchaToken] = useState("");
    const dispatch = useDispatch()

    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Login Page"
    }, [])

    function onChange(value)
    {
        setcaptchaToken(value || "");
    }

    async function onlogin(e) 
    {
        e.preventDefault()
        const logindata = { studentID, pass };
        try 
        {
            setloading(true)
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/student_login`, logindata)
            if (resp.data.statuscode === 1) 
            {
                dispatch(StudentLogin(resp.data.studentdata))
                sessionStorage.setItem("studentdata", JSON.stringify(resp.data.studentdata));
                toast.success(resp.data.msg)
                navi("/studentHome")
            }
            else 
            {
                toast.warn(resp.data.msg)
                cancel()
            }
        }
        catch (e) 
        {
            toast.error("Error Occured : " + e.message)
        }
        finally
        {
            setloading(false)
        }
    }

    function cancel()
    {
        setstudentID("");
        setpass("")
    }

    return (
        <div id="authpage">

            <div className="container">
                <div className="row ">
                    <div className="col-lg-6 col-12 ">
                        <img src={`/assets/images/login.jpg`} alt="" className="img-fluid authimage " />
                    </div>
                    <div className="col-lg-6 col-12 text-center mb-5">

                        <div className={`containerdiv mt-5 `}>
                            <Link
                                to="/student_login"
                                className={`link active`}
                                style={{ fontSize: "0.9rem" }}
                            >
                                Log in
                            </Link>

                        </div>
                        <form onSubmit={onlogin} className="register-form mt-4 ">

                            <div className="input-container mt-5 ">

                                <input type="text" name="studentID" placeholder="" value={studentID} onChange={(e) => setstudentID(e.target.value)} className="input-field" required />

                                <label className="input-label">
                                    <span><i className="fa-solid fa-envelope" /></span><span>Student ID</span>
                                </label>

                            </div>

                            <div className="input-container mt-4 ">

                                <input type="password" name="userpass" placeholder="" value={pass} onChange={(e) => setpass(e.target.value)} className="input-field" required />

                                <label className="input-label">
                                    <span><i className="fa-solid fa-lock" /></span><span>Password</span>
                                </label>
                            </div>

                            <br />
                            {/* <div className="captcha-container"><ReCAPTCHA sitekey="6LfERsgrAAAAALuRJGrIb-al3osvxot0jCNfyLgU" onChange={onChange} /></div> */}

                            {
                                loading ?
                                    <div className="loader-container mt-2">
                                        <img src="assets/images/loader.gif" alt="loader" className="loader" />
                                    </div> : <input type="submit" className="register-button mt-3" value="SIGN IN" />
                            }

                            <Link to="/forgot_password_by_student" className="login-link mt-4" >Forgot Password</Link>

                        </form>

                    </div>

                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Student_Login
