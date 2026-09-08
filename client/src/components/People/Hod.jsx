import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./People.css"
import { useEffect } from 'react'

function Director()
{
    useEffect(() =>
    {
        document.title = "Head/Coordinator of Department"
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
                        <span className="crumb active">Head/Coordinator of Department</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Head of Department</h1>
                        <div className="director-card">
                            <img src="/assets/images/hod.png" alt="Director" className="director-img img-fluid " />

                            <h3 className="director-name text-center">Dr. Balwinder Singh</h3>
                            <p className="director-designation text-center">Principal, ACS Division</p>

                            {/* <p className="director-message"> */}
                            <p className="para">
                                ACADEMIC AND CONSULTANCY SERVICES DIVISION, C-DAC Mohali has consistently maintained an exemplary academic record. The greatest asset of the department is its highly enthused and learned faculty. Various organizations all over the globe require technically skilled people; the Department is taking an initiative to produce highly trained and capable engineers who deal with the challenges faced by the world today. The strength of the department lies in the expertise of the faculty and support of the staff that prepares the students to work in global diverse cultural work environment. We expect our students to utilize the skills that they have developed during their stay at CDAC to contribute towards a better society.
                            </p>
                            <p className="para">
                                The quality of academic structure, conduct guidelines and other activities undertaken at the institute are designed to produce competent and successful engineers.
                            </p>
                            <p className="para">
                                We believe that academic structuring and practical approach play key role in the department. ACSD has a fine blend of renowned as well as young and dynamic personalities as faculty, who are involved in imparting quality education to the budding engineers. The faculty strives to bolster a teaching methodology that is a balance of practical and theoretical approach. This orientation has led to successful projects and trainings that are an asset for CDAC.
                            </p>
                            <p className="para">
                                The lab facilities are upgraded from time to time and maintained well to provide adequate opportunities for the students to learn and innovate. The Department is fully equipped as per the requirement for the curriculum.
                            </p>
                        </div>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">People</h3>
                        <ul>
                            <li className="active"><Link to="#">Faculty</Link></li>
                            <div className="ps-4">
                                <li className="active"><Link to="/hod">Head/ Coordinator of Department</Link> </li>
                                <li><Link to="/list_of_faculty">List of Faculty</Link> </li>
                            </div>
                            <li><Link to="/staff">Staff</Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Director
