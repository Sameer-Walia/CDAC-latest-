import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import "./Academics.css";

function Academic_Overview()
{
    return (
        <div>
            <div id="academics_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Academics </span>
                        <span className="separator">›</span>
                        <span className="crumb active">Academic Overview</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Academic Overview at ACSD, C-DAC Mohali</h1>

                        <p className="para">
                            The Academic & Consultancy Services Division (ACSD) at C-DAC Mohali is committed to excellence in Teaching & Training, Research, and Industrial Consultancy. Our semester-based programs include a minimum of 45 instructional days, with courses conducted in English. Student performance is assessed continuously, and thesis work undergoes rigorous evaluation by peer examiners from ACSD and leading organizations across Northern India. Key Academic Highlights: Co-Curricular Engagement: We offer a vibrant academic environment complemented by co-curricular activities, including special lectures and workshops from experts at top institutions like IISC Bangalore, IIT Ropar, NIT Hamirpur, NIT Jalandhar, SCL Mohali, PEC University of Technology, and UIET Chandigarh. Faculty Excellence: Our distinguished faculty members receive national recognition for their academic contributions and engage in prominent workshops and training programs. Industry Collaboration: ACSD excels in industry interaction through faculty consultancy, implementing innovative solutions in projects sponsored by government bodies such as MeitY and DST. We also foster academic partnerships with Northern Indian institutes through faculty development initiatives and various workshops.
                        </p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Academics</h3>
                        <ul>
                            <li className="active"><Link to="/academic_overview">Academic Overview</Link></li>
                            <li><Link to="/programmes">Programmes</Link> </li>
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

export default Academic_Overview
