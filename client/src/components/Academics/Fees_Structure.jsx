import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

function Fees_Structure()
{
    useEffect(() =>
    {
        document.title = "Fee Structure"
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
                        <span className="crumb active">Fee Structure</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Revised Fee Structure for 2024 batch for all programs</h1>
                        <div id="academic_fees_table" className="table-responsive mt-4">
                            <table className="custom-fee-table">
                                <thead>
                                    <tr>
                                        <th colSpan="3" className="table-title">FIRST SEMESTER</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr><td>1</td><td>Admission Fee</td><td>Rs. 5,000/-</td></tr>
                                    <tr><td>2</td><td>Tuition Fee</td><td>Rs. 33,000/-</td></tr>
                                    <tr><td>3</td><td>Examination Fee</td><td>Rs. 3,000/-</td></tr>
                                    <tr><td>4</td><td>Development Charges</td><td>Rs. 5,000/-</td></tr>
                                    <tr><td>5</td><td>University Related Fee</td><td>Rs. 3,000/-</td></tr>
                                    <tr><td>6</td><td>Security (Refundable)</td><td>Rs. 8,000/-</td></tr>
                                    <tr><td>7</td><td>Student Related Fee</td><td>Rs. 4,700/-</td></tr>
                                    <tr><td>8</td><td>Counselling Fee</td><td>Rs. 2,000/-</td></tr>

                                    <tr className="total-row">
                                        <td colSpan="2">Total amount to be paid at the time of admission</td>
                                        <td>Rs. 63,700/-</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="custom-fee-table mt-5">
                                <thead>
                                    <tr>
                                        <th colSpan="3" className="table-title">SECOND SEMESTER</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr><td>1</td><td>Tuition Fee</td><td>Rs. 33,000/-</td></tr>
                                    <tr><td>2</td><td>Examination Fee</td><td>Rs. 3,000/-</td></tr>
                                    <tr><td>3</td><td>Development Charges</td><td>Rs. 5,000/-</td></tr>
                                    <tr><td>4</td><td>Student Related Fee</td><td>Rs. 4,700/-</td></tr>

                                    <tr className="total-row">
                                        <td colSpan="2">Total amount to be paid at start of II Sem</td>
                                        <td>Rs. 45,700/-</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="custom-fee-table mt-5">
                                <thead>
                                    <tr>
                                        <th colSpan="3" className="table-title">THIRD SEMESTER</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr><td>1</td><td>Tuition Fee</td><td>Rs. 20,000/-</td></tr>
                                    <tr><td>2</td><td>Examination Fee</td><td>Rs. 3,000/-</td></tr>
                                    <tr><td>3</td><td>Development Charges</td><td>Rs. 5,000/-</td></tr>
                                    <tr><td>4</td><td>University Related Fee</td><td>Rs. 2,500/-</td></tr>
                                    <tr><td>5</td><td>Student Related Fee</td><td>Rs. 4,700/-</td></tr>

                                    <tr className="total-row">
                                        <td colSpan="2">Total amount to be paid at start of III Sem</td>
                                        <td>Rs. 35,200/-</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="custom-fee-table mt-5">
                                <thead>
                                    <tr>
                                        <th colSpan="3" className="table-title">FOURTH SEMESTER</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr><td>1</td><td>Tuition Fee</td><td>Rs. 11,000/-</td></tr>
                                    <tr><td>2</td><td>Examination Fee</td><td>Rs. 3,000/-</td></tr>
                                    <tr><td>3</td><td>Development Charges</td><td>Rs. 5,000/-</td></tr>
                                    <tr><td>4</td><td>Student Related Fee</td><td>Rs. 4,700/-</td></tr>
                                    <tr><td>5</td><td>Miscellaneous Charges</td><td>Rs. 5,500/-</td></tr>

                                    <tr className="total-row">
                                        <td colSpan="2">Total amount to be paid at start of IV Sem</td>
                                        <td>Rs. 29,200/-</td>
                                    </tr>
                                </tbody>
                            </table>

                            <p className="para mt-4">*Note: Project & Seminar will be considered as one subject.</p>

                            <table className="custom-fee-table mt-5">
                                <thead>
                                    <tr>
                                        <th colSpan="3" className="table-title">Hostel Fees Details</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr><td>1</td><td>Hostel Charges (Sharing Basis) fund</td><td>Rs. 7280/- per semester</td></tr>
                                    <tr><td>2</td><td>Mess Charges</td><td>Rs. 3500 /-per month</td></tr>
                                    <tr><td>3</td><td>Hostel mess security deposit (Refundable)</td><td>Rs. 1000/-</td></tr>

                                    <tr className="total-row">
                                        <td colSpan="2">Total amount to be paid at the time of admission</td>
                                        <td>Rs. 8,280/-</td>
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
                            <li><Link to="/academic_calendar">Academic Calendar</Link> </li>
                            <li><Link to="/syllabus">Syllabus</Link> </li>
                            <li className="active"><Link to="/fees_structure">Fee Structure</Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Fees_Structure
