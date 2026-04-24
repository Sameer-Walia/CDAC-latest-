import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"

function Academic_Calender()
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
                        <span className="crumb active">Academic Calendar</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Academic Calendar</h1>
                        <div id="academic_calender_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Academic Calender</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>Academic Calendar 2021-22</td>
                                        <td>
                                            <a
                                                href="http://acsd.ac.in/readdata/academic%20calandar.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pdf_cal_link"
                                            >
                                                📄View PDF
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Academics</h3>
                        <ul>
                            <li><Link to="/academic_overview">Academic Overview</Link></li>
                            <li><Link to="/programmes">Programmes</Link></li>
                            <div className="ps-4">
                                <li><Link to="/mtech_ai">M.Tech – Artificial Intelligence (AI)</Link> </li>
                                <li><Link to="/mtech_vlsi">M.Tech - VLSI Design</Link> </li>
                                <li><Link to="/mtech_es">M.Tech - Embedded Systems (ES)</Link> </li>
                            </div>
                            <li className="active"><Link to="/academic_calendar">Academic Calendar</Link> </li>
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

export default Academic_Calender
