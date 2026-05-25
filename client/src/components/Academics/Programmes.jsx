import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import "./Academics.css";
import { useEffect } from "react";

function Programmes()
{

    useEffect(() =>
    {
        document.title = "Programmes"
    }, [])

    return (
        <div>
            <div id="academics_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Academics </span>
                        <span className="separator">›</span>
                        <span className="crumb active">Programmes</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Programmes</h1>

                        <p className="para">
                            As part of the mandate given to C-DAC, Mohali to generate manpower to address the growing demand for trained manpower in the extremely fast moving sector of Electronics & Information Technology C-DAC, Mohali has established its ACSD (Academic & Consultancy Services Division). ACSD has been providing high-end training in the field of hardware and software, running M.Tech programmes along with its Research and Development activities in various fields viz., Electronics Product Design & Technology (EPDT), Very Large Scale Integration (VLSI) Design, Embedded Systems (ES) and Information Technology (IT).
                        </p>
                        <div className="programmes-list">
                            <Link to="/mtech_ai" className="programme-card">
                                M.Tech - Artificial Intelligence (AI)
                            </Link>

                            <Link to="/mtech_vlsi" className="programme-card">
                                M.Tech - Very Large Scale Integration (VLSI)
                            </Link>

                            <Link to="/mtech_es" className="programme-card">
                                M.Tech - Embedded Systems (ES)
                            </Link>
                        </div>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Academics</h3>
                        <ul>
                            <li><Link to="/academic_overview">Academic Overview</Link></li>
                            <li className="active"><Link to="/programmes">Programmes</Link></li>
                            <div className="ps-4">
                                <li><Link to="/mtech_ai">M.Tech – Artificial Intelligence (AI)</Link> </li>
                                <li><Link to="/mtech_vlsi">M.Tech - VLSI Design</Link> </li>
                                <li><Link to="/mtech_es">M.Tech - Embedded Systems (ES)</Link> </li>
                            </div>
                            <li><Link to="/academic_calendar">Academic Calendar</Link> </li>
                            <li><Link to="/syllabus">Syllabus</Link> </li>
                            <li><Link to="/fees_structure">Fee Structure</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Programmes

