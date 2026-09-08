import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import "./Admissions.css"
import { useEffect } from "react"

function SeatDistribution()
{
    useEffect(() =>
    {
        document.title = "Seat Distribution"
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
                        <span className="crumb active">Seat Distribution</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Seat Distribution</h1>

                        <div id="admission_seat_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Course Name	</th>
                                        <th>Category</th>
                                        <th>Total Seats</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Electronics Product Design & Technology</td>
                                        <td>
                                            Backward areas, Eligible for Urban Area Status in Punjab State, Punjab State 85% Quota for Candidate of Punjab, Candidate belongs to Non Sikh Minority
                                        </td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Electronics Product Design & Technology</td>
                                        <td>
                                            Children/Widows of Police/Para military forces/ Punjab Police; PAP and Punjab Home Guards, Eligible for Urban Area Status in Punjab State, Punjab State 85% Quota for Candidate of Punjab, Candidate belongs to Non Sikh Minority
                                        </td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Electronics Product Design & Technology</td>
                                        <td>
                                            General, Eligible for Urban Area Status in Punjab State, All India Category(15% Quota for other States), Candidate belongs to Non Sikh Minority
                                        </td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Electronics Product Design & Technology</td>
                                        <td>
                                            General, Eligible for Urban Area Status in Punjab State, Punjab State 85% Quota for Candidate of Punjab, Candidate belongs to Non Sikh Minority
                                        </td>
                                        <td>16</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Electronics Product Design & Technology</td>
                                        <td>
                                            Riot affected/ Terrorist Affected Families, Eligible for Urban Area Status in Punjab State, Punjab State 85% Quota for Candidate of Punjab, Candidate belongs to Non Sikh Minority
                                        </td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Electronics Product Design & Technology</td>
                                        <td>
                                            Schedule Casters/ Scheduled Tribes, Eligible for Urban Area Status in Punjab State, All India Category (15% Quota for other States), Candidate belongs to Non Sikh Minority
                                        </td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Electronics Product Design & Technology</td>
                                        <td>
                                            Schedule Casters/ Scheduled Tribes, Eligible for Urban Area Status in Punjab State, Punjab State 85% Quota for Candidate of Punjab, Candidate belongs to Non Sikh Minority
                                        </td>
                                        <td>2</td>
                                    </tr>
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
                            <li><Link to="/admission_helpline">Admission Helpline</Link> </li>
                            <li className="active"><Link to="/seat_distribution">Seat Distribution</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default SeatDistribution
