import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Login/Login.css";

function Staff_Register()
{

    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [cpass, setcpass] = useState("");
    const [terms, setterms] = useState(false);
    const [loading, setloading] = useState(false);

    const navi = useNavigate();

    useEffect(() =>
    {
        document.title = "Register Page"
    }, [])

    async function onsignup(e) 
    {
        e.preventDefault()

        if (terms === true) 
        {
            if (pass === cpass) 
            {
                const reqdata = { name, phone, email, pass }
                try 
                {
                    setloading(true)
                    const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/add_teacher_by_itself`, reqdata)
                    if (resp.data.statuscode === 1)
                    {
                        navi("/thanks")
                        toast.success(resp.data.msg)
                    }
                    else if (resp.data.statuscode === 2)
                    {
                        navi("/nothanks")
                        toast.warn(resp.data.msg)
                    }
                    else if (resp.data.statuscode === 0)
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
            else
            {
                toast.error("Password and Confirm Password Doesnot Match")
            }
        }
        else
        {
            toast.warn("Please accept terms and condition")
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

            <form name="form1" onSubmit={onsignup} className="register-form mb-5" >

                <div className="input-container mt-4 ">

                    <input type="text" name="name" placeholder="" className="input-field" onChange={(e) => setname(e.target.value)} required minLength={3} />
                    <label className="input-label">
                        <span><i className="fa-solid fa-user" /></span><span>Name</span>
                    </label>

                </div>

                <div className="input-container mt-4 ">

                    <input type="tel" name="usernumber" placeholder="" className="input-field" onChange={(e) => setphone(e.target.value)} minLength={10} maxLength={10} required />
                    <label className="input-label">
                        <span><i className="fa-solid fa-phone" /></span><span>Phone</span>
                    </label>

                </div>

                <div className="input-container mt-4 ">

                    <input type="email" name="useremail" placeholder="" className="input-field" onChange={(e) => setemail(e.target.value)} required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-envelope" /></span><span>Email</span>
                    </label>

                </div>

                <div className="input-container mt-4 ">

                    <input type="password" name="password" placeholder="" className="input-field" onChange={(e) => setpass(e.target.value)} required />
                    {/* pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" */}

                    <label className="input-label">
                        <span><i className="fa-solid fa-lock" /></span><span>Password</span>
                    </label>

                </div>
                <div className="input-container mt-4 ">

                    <input type="password" name="confirmpass" placeholder="" className="input-field" onChange={(e) => setcpass(e.target.value)} required />

                    <label className="input-label">
                        <span><i className="fa-solid fa-lock" /></span><span>Confirm Password</span>
                    </label>


                </div>
                <label className="checkbox m-4">
                    <input type="checkbox" name="cbx1" onChange={(e) => setterms(e.target.checked)} /><i> </i>I accept the terms and conditions
                </label>

                <button type="submit" className="register-button " disabled={loading}>
                    {loading ? "Signing up..." : "SIGN UP"}
                </button>

                <p className="register-text">
                    Already registered? <Link to="/staff_login" className="login-link" >Login</Link>
                </p>

                <Link to="/resend_mail" className="login-link" >Resend Email</Link>

            </form>

        </div>
    )
}

export default Staff_Register
