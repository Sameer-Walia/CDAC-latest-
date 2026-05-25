import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./StudentCorner.css"
import { useEffect } from 'react';

function AntiRagging()
{
    useEffect(() =>
    {
        document.title = "Anti Ragging";
    }, []);


    return (
        <div>
            <div id="studentcorner_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Student Corner</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Anti Ragging</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Anti Ragging</h1>
                        <div id="student_antiragging_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Category</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>Anti-ragging AICTE Letter</td>
                                        <td>
                                            <a href="http://acsd.ac.in/readdata/Antiragging%20AICTE%20Letter.pdf" target="_blank" rel="noopener noreferrer" className="pdf_cal_link">📄View PDF</a>
                                        </td>
                                    </tr>
                                    <tr><td>2</td><td>Anti-ragging Affidavit</td>
                                        <td>
                                            <a href="http://acsd.ac.in/readdata/Anti-Ragging-Affidavit.pdf" target="_blank" rel="noopener noreferrer" className="pdf_cal_link">📄View PDF</a>
                                        </td>
                                    </tr>
                                    <tr><td>3</td><td>Anti-ragging HELP LINE</td>
                                        <td>
                                            <a href="http://acsd.ac.in/readdata/ANTI%20RAGGING%20HELP%20LINE.pdf" target="_blank" rel="noopener noreferrer" className="pdf_cal_link">📄View PDF</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Student Corner</h3>
                        <ul>
                            <li><Link to="/library">Library</Link></li>
                            <li><Link to="/laboratories">Laboratories</Link> </li>
                            <li><Link to="/hostel">Hostels</Link> </li>
                            <li className="active"><Link to="/antiragging">Anti Ragging</Link> </li>
                            <li><Link to="#">Alumni</Link> </li>
                            <li><Link to="/sports">Sports</Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AntiRagging
