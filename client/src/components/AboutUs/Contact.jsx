import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import "./AboutUs.css";


function Contact()
{

    const [uname, setuname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [message, setmessage] = useState("");
    const [loading, setloading] = useState(false);
    const navi = useNavigate();
    const [hcaptcha, sethcaptcha] = useState(false);
    return (
        <div>
            <div id="about_page" className="pt-4 mb-5">
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
                            <h2 className="hd">Leave a <span>Message</span></h2>

                            <form>
                                <input type="text" placeholder="Your Name" />
                                <input type="tel" placeholder="Your Phone Number" />
                                <input type="email" placeholder="Your Email" />
                                <textarea placeholder="Your message here..."></textarea>

                                <button type="submit">Submit</button>
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
