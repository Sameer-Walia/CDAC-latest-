import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./Placement.css"

function Contact_Po()
{
    return (
        <div>
            <div id="placement_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Placement Cell</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Contact PO</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Contact PO</h1>

                        <h3>Placement Officer:</h3>
                        <h6>Mr. Kumar Gurvaran</h6>
                        <h6>Phone No: +91 7696282434</h6>
                        <h6>Email: gurvarandeep[at]cdac.in</h6>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Placement Cell</h3>
                        <ul>
                            <li><Link to="/po_message">PO's Message</Link></li>
                            <li><Link to="/placement_acsd">Placement at ACSD</Link></li>
                            <li><Link to="/brochure">Placement Brochure</Link></li>
                            <li className="active"><Link to="/contact_po">Contact PO</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact_Po
