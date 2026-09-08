import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import "./Admissions.css"
import { useEffect } from "react"

function Eligibility_criteria()
{
    useEffect(() =>
    {
        document.title = "Eligibility Criteria"
    }, [])

    return (
        <div>
            <div id="admissions_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Admissions </span>
                        <span className="separator">›</span>
                        <span className="crumb active">Eligibility Criteria</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Eligibility Criteria</h1>
                        <p className="para">The admission to all the M.Tech programmes will be regulated through GATE in the relevant branch however non GATE qualified students may also be considered for admission, provided seats remain after considering all the GATE qualified applicants. All those candidates who have passed B.Tech / B.E with atleast 50% marks in aggregate,(45% in case of candidate belonging to reserved category) preference with valid GATE score shall be eligible.</p>

                        <div id="admission_ec_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Name of the Programme</th>
                                        <th>No. of Seats</th>
                                        <th>Eligibility for Admission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>VLSI Design</td><td>18</td>
                                        <td>
                                            B.E / B.Tech in Electronics & Communication / Electrical Engineering / Electronics & Instrumentation Engineering / Electrical & Electronics Engineering / CSE / IT / Control Engineering / Microelectronics Engineering.
                                        </td>
                                    </tr>
                                    <tr><td>Embedded Systems</td><td>18</td>
                                        <td>
                                            B.E / B.Tech in Electronics & Communication / Electronics & Instrumentation Engineering / Applied Electronics / Instrumentation & Control Engineering / Electrical & Electronics Engineering / M.Sc in Physics(with specialization in Electronics)
                                        </td>
                                    </tr>
                                    <tr><td>CSE (AI)</td><td>18</td>
                                        <td>
                                            B.E. / B. Tech. (CSE/ IT/ Software Engg./ Computer Engg./ Software Systems/ Information Security/ Cyber Security/ Computational Engg./ Machine learning) with atleast 50% (45% in case of candidate belonging to reserved category)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Admissions</h3>
                        <ul>
                            <li><Link to="/procedure">Admission Procedure</Link></li>
                            <li className="active"><Link to="/eligibility_criteria">Eligibility Criteria</Link> </li>
                            <li><Link to="#">Information Brochure</Link> </li>
                            <li><Link to="/admission_helpline">Admission Helpline</Link> </li>
                            <li><Link to="/seat_distribution">Seat Distribution</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Eligibility_criteria










