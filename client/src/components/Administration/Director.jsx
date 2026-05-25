import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./Administration.css"
import { useEffect } from 'react'

function Director()
{
    useEffect(() =>
    {
        document.title = "Director"
    }, [])

    return (
        <div>
            <div id="adminstration_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Administration</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Director</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Director</h1>
                        <div className="director-card">
                            <img src="/assets/images/director.png" alt="Director" className="director-img img-fluid " />

                            <h3 className="director-name text-center">Mr. V.K Sharma</h3>
                            <p className="director-designation text-center">Director, C-DAC Mohali</p>

                            {/* <p className="director-message"> */}
                            <p className="para">
                                The fourth industrial revolution is beginning to fundamentally change the way we live and work.
                                As per Klaus Schwab, Founder and Executive Chairman, World Economic Forum, “there has never been
                                a time of greater promise, or greater peril” primarily because technology is changing what it
                                means to be human. At C-DAC Mohali we realise the need to prepare students of today to be agents
                                of change.
                            </p>
                            <p className="para">
                                Through our Masters programmes we provide an environment that enables our students to be life-long
                                learners and makes them ready to adapt to technologies in compressed time frames. In past two decades,
                                C-DAC Mohali has facilitated access to low-cost high quality higher technical education centered
                                around cutting-edge technologies.
                            </p>
                            <p className="para">
                                Efforts are made to engage students on live projects of national impact. Each student is coached
                                and mentored by our talented faculty members who are leaders and authority in their respective
                                fields nationally and internationally.
                            </p>
                            <p className="para">
                                We welcome you all to join us towards a bright future!
                            </p>

                            <p className="director-sign">(Mr. V.K Sharma)</p>
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Administration</h3>
                        <ul>
                            <li className="active"><Link to="/director">Director</Link></li>
                            <li><Link to="/rules_guidelines">Rules & guidelines</Link> </li>
                            <li> <Link to="/notice">Notice</Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Director
