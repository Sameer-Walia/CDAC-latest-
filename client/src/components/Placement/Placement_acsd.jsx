import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./Placement.css"
import { useEffect } from 'react'

function Placement_acsd()
{
    useEffect(() =>
    {
        document.title = "Placement at ACSD"
    }, [])

    return (
        <div>
            <div id="placement_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Placement Cell</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Placement at ACSD</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Placement at ACSD</h1>

                        <p className="para">
                            ACSD provides a strong base for placement and industrial training requirement of the program. The students are assigned the projects on full time basis as per course requirement, in their 4th semester. Further the work culture of the organization provides a good environment to students to interact and get first hand information for working on live projects during their class room teaching too. The placement cell headed by the placement officer handles all the placement activities for the final year students of the institute. The cell along with the student’s co-coordinators provides the best possible assistance to the recruiters and also put their consummate efforts, extending from contacting companies to managing all logistics of arranging for tests, group discussions, pre-placement talks and final interviews.
                        </p>
                        <p className="para">
                            Our students placed in the following organizations:
                        </p>
                        <div className="placement-section">

                            <div className="placement-column">
                                <h4>Research/PhD</h4>
                                <ul>
                                    <li>IIT, Mandi</li>
                                    <li>IIT, Jodhpur</li>
                                    <li>IIT, Ropar</li>
                                    <li>NIT, Jalandhar</li>
                                    <li>NIT, Hamirpur</li>
                                    <li>C-DAC, Mohali</li>
                                </ul>

                                <h4 className="mt-4">Teaching</h4>
                                <ul>
                                    <li>LPU, Jalandhar</li>
                                    <li>Punjab University, Chandigarh</li>
                                    <li>Chitkara University, Baddi</li>
                                    <li>Kurukshetra University</li>
                                    <li>Chandigarh University, Gharuan</li>
                                    <li>Indo Global College of Engineering</li>
                                    <li>Thapar Institute of Engg & Technology, Patiala</li>
                                </ul>
                            </div>

                            <div className="placement-column">
                                <h4>Core Technical</h4>
                                <ul>
                                    <li>Cadence Design Systems</li>
                                    <li>Nvidia Graphics</li>
                                    <li>Samtel HCL Technologies</li>
                                    <li>Mando Softtech</li>
                                    <li>ST Microelectronics</li>
                                    <li>Virage Logic</li>
                                    <li>Backend Solutions</li>
                                </ul>

                                <ul className="mt-5">
                                    <li>DAV Institute of Engineering and Technology, Jalandhar</li>
                                    <li>NIELIT Chandigarh</li>
                                    <li>Chandigarh Group of Colleges, Landran</li>
                                    <li>Bahra University, Solan</li>
                                    <li>Maulana University, Ambala</li>
                                    <li>Rayat Institute of Engineering and Technology</li>
                                </ul>
                            </div>

                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Placement Cell</h3>
                        <ul>
                            <li><Link to="/po_message">PO's Message</Link></li>
                            <li className="active"><Link to="/placement_acsd">Placement at ACSD</Link></li>
                            <li><Link to="#">Placement Brochure</Link></li>
                            <li><Link to="/contact_po">Contact PO</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Placement_acsd
