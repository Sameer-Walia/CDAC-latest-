import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./Placement.css"

function PoMessage()
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
                        <span className="crumb active">PO's Message</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">PO's Message</h1>
                        <div className="director-card">

                            <p className="para">
                                I consider it to be an honour and opportunity to extend a very warm welcome to potential recruiter organizations to Centre for Development of Advanced Computing(C-DAC), Mohali.
                            </p>
                            <p className="para">
                                We present to you a group of young, self-motivated individuals who have been groomed to face challenges of managing in ever changing of technology. Our students display a high caliber of technical qualities which helps them in solving difficult problems. They have full grasp & knowledge of their discipline and have an excellent attitude towards innovation and progress.
                            </p>
                            <p className="para">
                                I look at the future of C-DAC Mohali Students with sanguinity and assurance that they will be well received by the industry. I wish the students of this batch grand success in their accomplishments and believe that they will make noteworthy contributions to the corporate world.
                            </p>
                            <p className="para">
                                The Placement Cell of the Institute is aptly set up, not only to get a right job, but guides each of its students to get into the right career. The process of personal attention and hand holding is a norm and is followed at every aspect of the life of a student, which has resulted in the students achieving laurels in the profession they have chosen.
                            </p>
                            <p className="para">
                                On behalf of the institute, it is my pleasure to invite you to our academic campus to provide training opportunity to the global leaders and for conducting campus selection for our students. It would be an honor for us, if you visit our campus for selecting candidates of your choice. We earnestly look forward for having enthusiastic participation from the organizations during this year.
                            </p>

                            <p className="director-sign">Mr. Kumar Gurvaran
                                <br />Placement Officer</p>
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Placement Cell</h3>
                        <ul>
                            <li className="active"><Link to="/po_message">PO's Message</Link></li>
                            <li><Link to="/placement_acsd">Placement at ACSD</Link></li>
                            <li><Link to="/brochure">Placement Brochure</Link></li>
                            <li><Link to="/contact_po">Contact PO</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PoMessage
