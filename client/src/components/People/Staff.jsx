import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import { useEffect } from "react"

function Staff()
{
    useEffect(() =>
    {
        document.title = "Staff"
    }, [])

    return (
        <div>
            <div id="people_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">People </span>
                        <span className="separator">›</span>
                        <span className="crumb active">Staff</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Staff</h1>

                        <div id="people_staff_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Qualification</th>
                                        <th>Specialization</th>
                                        <th>Phone(0172-66190)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="6" className="section-row text-center fw-bold">
                                            Technical Staff
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mr. Suresh Jambagi</td>
                                        <td>Senior Technical Assistant</td>
                                        <td>B.Tech</td>
                                        <td>ECE</td>
                                        <td>21</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Mr. Harpreet Singh</td>
                                        <td>Project Associate</td>
                                        <td>B.Tech.</td>
                                        <td>ECE</td>
                                        <td>72</td>
                                    </tr>

                                    <tr>
                                        <td>3</td>
                                        <td>Mr. Paramjeet Singh</td>
                                        <td>MSS4 Senior Mechanic</td>
                                        <td>ITI Turner</td>
                                        <td>Mechanical</td>
                                        <td>23</td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6" className="section-row text-center fw-bold">
                                            Supporting Staff
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mr. Kumar Gurvaran</td>
                                        <td>Project Service Support - II</td>
                                        <td>MBA</td>
                                        <td>Finance & HR</td>
                                        <td>81</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">People</h3>
                        <ul>
                            <li><Link to="#">Faculty</Link></li>
                            <div className="ps-4">
                                <li><Link to="/hod">Head/ Coordinator of Department</Link> </li>
                                <li><Link to="/list_of_faculty">List of Faculty</Link> </li>
                            </div>
                            <li className="active"><Link to="/staff">Staff</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Staff
