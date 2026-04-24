import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import "./Admissions.css"

function Admission_help()
{
    return (
        <div>
            <div id="admissions_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Admissions </span>
                        <span className="separator">›</span>
                        <span className="crumb active">Admission Help Line</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Admission Help Line</h1>
                        <div id="admission_help_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Mail</th>
                                        <th>Phone No.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>mtech-mohali[at]cdac.in</td><td>+91-172-6619078</td></tr>
                                    <tr><td>2</td><td>acsdcofficial[at]gmail.com</td><td>+91-172-6619072</td></tr>
                                    <tr><td>3</td><td>balwinder@cdac.in</td><td>+91-9888000646</td></tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Admissions</h3>
                        <ul>
                            <li><Link to="/procedure">Admission Procedure</Link></li>
                            <li><Link to="/eligibility_criteria">Eligibility Criteria</Link> </li>
                            <li><Link to="#">Information Brochure</Link> </li>
                            <li className="active"><Link to="/admission_helpline">Admission Helpline</Link> </li>
                            <li><Link to="/seat_distribution">Seat Distribution</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Admission_help










