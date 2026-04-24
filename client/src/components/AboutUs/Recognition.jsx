import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./AboutUs.css";

function Recognition()
{
    return (
        <div>
            <div id="about_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">About Us</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Recognition & Approval</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Recognition & Approval</h1>

                        <p className="para">
                            Centre for Development of Advanced Computing (C-DAC) is the premier R&D organization of Ministry of Electroncis & Information Technology (MEITy) for carrying out R&D in Electronics, Information Technology and associated areas. Different areas of C-DAC, had originated at different times, many of which came out as a result of identification of opportunities.
                        </p>

                        <p className="para">
                            As part of the mandate given to C-DAC, Mohali to generate manpower to address the growing demand for trained manpower in the extremely fast moving sector of Electronics & Information Technology C-DAC, Mohali has established its ACSD (Academic & Consultancy Services Division). ACSD has been providing high-end training in the field of hardware and software, running M.Tech programs along with its Research and Development activities in various fields viz., Electronic Product Design & Technology (EPDT), Very Large Scale Integration (VLSI) Design, Embedded System (ES).
                        </p>

                        <p className="para">
                            ACSD, C-DAC Mohali is affiliated to Punjab Technical University, Jalandhar and approved by All India Council for Technical Education
                        </p>

                        <div className="pdf-links">
                            <a href="http://acsd.ac.in/readdata/PTUAFF23.PDF" target="_blank" rel="noopener noreferrer">
                                📄 PTU Affiliation Letter
                            </a>

                            <a href="http://acsd.ac.in/readdata/EOA23.PDF" target="_blank" rel="noopener noreferrer">
                                📄 AICTE Approval Letter 2023
                            </a>
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">About Us</h3>
                        <ul>
                            <li><Link to="/overview">Overview</Link></li>
                            <li className="active"><Link to="/recognition">Recognition & Approval</Link> </li>
                            <li> <Link to="/departmental_activities">Departmental Activities</Link> </li>
                            <li><Link to="/gallery">Photo Gallery</Link></li>
                            <li><Link to="/holidays_list">Holiday List</Link></li>
                            <li><Link to="/contact">Contact Information</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Recognition
