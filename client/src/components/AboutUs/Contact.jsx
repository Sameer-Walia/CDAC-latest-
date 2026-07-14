import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import "./AboutUs.css";
import { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';


function Contact()
{

    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [email, setemail] = useState("")
    const [message, setmessage] = useState("");

    const [loading, setloading] = useState(false);
    const [captchaToken, setcaptchaToken] = useState("");
    const dispatch = useDispatch()
    const navi = useNavigate();


    useEffect(() =>
    {
        document.title = "Contact Page"
    }, [])

    function onChange(value)
    {
        setcaptchaToken(value || "");
    }

    async function onsend(e) 
    {
        e.preventDefault()

        // if (captchaToken)
        // {
        if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim())
        {
            return toast.error("All fields are required");
        }

        if (name?.trim().length < 3)
        {
            return toast.error("Name must be at least 3 characters");
        }

        if (!/^[0-9]{10}$/.test(phone))
        {
            return toast.error("Phone must be 10 digits");
        }

        if (!/\S+@\S+\.\S+/.test(email))
        {
            return toast.error("Invalid email format");
        }

        const data = { name, phone, email, message, captchaToken }
        try 
        {
            setloading(true);
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/ContactUs`, data)
            if (resp.data.statuscode === 1) 
            {
                toast.success(resp.data.msg);
                setname("")
                setphone("")
                setemail("")
                setmessage("")
                setcaptchaToken("")
            }
            else 
            {
                toast.warning(resp.data.msg);
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
        // }
        // else
        // {
        //     toast.error("Captcha Verification failed , try again")
        // }
    }


    return (
        <div>
            <div id="about_page" className="pt-4 mb-5">

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

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">About Us</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Contact Information</span>
                    </div>
                </div>
                <div className="pt-4">
                    <div className="contact-wrapper">

                        {/* LEFT MAP */}
                        <div className="contact-left">
                            <div className="map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.3838800914127!2d76.70235017503656!3d30.70760678684755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef90ed766697%3A0xf41e185cad10b37!2sCDAC%20Main%20Gate!5e0!3m2!1sen!2sin!4v1774848005352!5m2!1sen!2sin" ></iframe>
                            </div>

                            <div className="contact-card">
                                <div className="card-content">
                                    <h3>Contact Infos</h3>
                                    <p>Centre for Development of Advanced Computing</p>
                                    <p>A-34, Industrial Area, Phase VIII, Mohali - 160071. (INDIA).</p>

                                    <ul>
                                        <li>📧 mtech-mohali[at]cdac.in</li>
                                        <li>📧 acsdcofficial[at]gmail.com</li>
                                        <li>📞 +91-172-6619078</li>
                                        <li>📞 +91-172-6619081</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT FORM */}
                        <div className="contact-right">
                            <h2 className="hd mt-4">Leave a <span>Message</span></h2>

                            <form name="contactform" onSubmit={onsend}>
                                <input type="text" placeholder="Your Name" value={name} required onChange={(e) => setname(e.target.value)} minLength={3} />
                                <input type="tel" placeholder="Your Phone Number" value={phone} required onChange={(e) => setphone(e.target.value)} minLength={10} maxLength={10} />

                                <input type="email" placeholder="Your Email" value={email} required onChange={(e) => setemail(e.target.value)} />

                                <textarea placeholder="Your message here..." value={message} required onChange={(e) => setmessage(e.target.value)}></textarea>

                                {/* <div className="captcha-container"><ReCAPTCHA sitekey="6LfERsgrAAAAALuRJGrIb-al3osvxot0jCNfyLgU" onChange={onChange} /></div> */}

                                <button type="submit" className='mt-3'>Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact
