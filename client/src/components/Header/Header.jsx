import { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TeacherLogOut } from "../../reduxslices/teacherSlice";
import axios from "axios";
import { toast } from "react-toastify";


function Header()
{
    const [menuOpen, setMenuOpen] = useState(false);

    const navi = useNavigate();

    function whichpage() 
    {
        navi("/")
    }

    return (
        <div id="navheader">
            <header>
                <div className="topbar">

                    <div className="left">Welcome Guest</div>

                    <div className="right">
                        <div onClick={whichpage} className="auth-btn homeicon"> <FaHome size={20} /></div>
                        <a href="https://cdac.in/" target="_blank" rel="noopener noreferrer" className="auth-btn login">C-DAC</a>
                        <Link to="/contact" className="auth-btn login">Contact Us</Link>
                        <Link to="/student_login" className="auth-btn login">Login</Link>
                    </div>
                </div>

                <div className="middlebar">
                    <img src="/assets/images/CDACLOGO.jpeg" onClick={whichpage} alt="Logo" className="logo" />

                    <div className="marquee-container">
                        <div className="marquee-track">

                            <Link to="/MtechAdmission"><button className="announce-btn blue">MTech Admission </button></Link>
                            <button className="announce-btn green">PhD Admission </button>
                            <Link to="/MtechAdmission"><button className="announce-btn orange">Apply Now</button></Link>

                        </div>
                    </div>
                </div>

                <nav className="header-navbar">
                    <div className="nav-container">

                        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                            ☰
                        </div>

                        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

                            <li className="dropdown">
                                <a href="#">About Us</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/overview">Overview</Link></li>
                                    <li><Link to="/recognition">Recognition & Approval</Link></li>
                                    <li><Link to="/departmental_activities">Departmental Activities</Link></li>
                                    <li><Link to="/gallery">Photo Gallery</Link></li>
                                    <li><Link to="/holidays_list">Holiday List</Link></li>
                                    <li><Link to="/contact">Contact Information</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#">Administration</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/director">Director</Link></li>
                                    <li><Link to="/rules_guidelines">Rules & guidelines</Link></li>
                                    <li><Link to="/notice">Notice</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#">Academics</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/academic_overview">Academic Overview</Link></li>
                                    <li className="dropdown-sub">
                                        <li><Link to="/programmes">Programmes ▸</Link></li>
                                        <ul className="dropdown-submenu">
                                            <li><Link to="/mtech_ai">M.Tech – Artificial Intelligence (AI)</Link></li>
                                            <li><Link to="/mtech_vlsi">M.Tech - VLSI Design</Link></li>
                                            <li><Link to="/mtech_es">M.Tech - Embedded Systems (ES)</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/academic_calendar">Academic Calendar</Link></li>
                                    {/* <li><Link to="/syllabus">Syllabus</Link></li> */}
                                    <li><Link to="/fees_structure">Fee Structure</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#">Admissions</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/procedure">Procedure</Link></li>
                                    <li><Link to="/eligibility_criteria">Eligibility Criteria</Link></li>
                                    <li><Link to="/admission_helpline">Admission Helpline</Link></li>
                                    <li><Link to="/seat_distribution">Seat Distribution</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#">People</a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-sub">
                                        <li><Link to="#">Faculty ▸</Link></li>
                                        <ul className="dropdown-submenu">
                                            <li><Link to="/hod">Head of Department</Link></li>
                                            <li><Link to="/list_of_faculty">List of Faculty</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/staff">Staff</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#">Research & Consultancy</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="#">Publications</Link></li>
                                    <li><Link to="/sponsored_projects">Sponsored Projects</Link></li>
                                    <li><Link to="/student_projects">Student Projects</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#">Details</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/library">Library</Link></li>
                                    <li><Link to="/laboratories">Laboratories</Link></li>
                                    <li><Link to="/hostel">Hostels</Link></li>
                                    <li><Link to="/antiragging">Anti Ragging</Link></li>
                                    <li><Link to="#">Alumni</Link></li>
                                    <li><Link to="/sports">Sports</Link></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#">Placement Cell</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/po_message">PO's Message</Link></li>
                                    <li><Link to="/placement_acsd">Placement at ACSD</Link></li>
                                    <li><Link to="#">Placement Brochure</Link></li>
                                    <li><Link to="/contact_po">Contact PO</Link></li>
                                </ul>
                            </li>

                            <li className="dropdown">
                                <a href="#">Student Corner</a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/studentcounselling">Student Counselling</Link></li>
                                    <li><a href="http://acsd.ac.in/readdata/Date%20sheet.pdf" target="_blank" rel="noopener noreferrer">Exam Date Sheet</a></li>
                                    <li><Link to="#">Exam Results</Link></li>
                                    <li><Link to="/timetable">Time Table</Link></li>
                                    <li><Link to="/syllabus">Syllabus</Link></li>

                                </ul>
                            </li>

                        </ul>

                    </div>
                </nav>

            </header >
        </div >
    );
}

export default Header;