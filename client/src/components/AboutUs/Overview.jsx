import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./AboutUs.css";
import { useEffect } from "react";

function Overview()
{

    useEffect(() =>
    {
        document.title = "Overview"
    }, [])

    return (
        <div>
            <div id="about_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">About Us</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Overview</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Overview</h1>

                        <p className="para">
                            Centre for Development of Advanced Computing (C-DAC), Mohali is a Scientific Society of the Ministry of Electronics and Information Technology, Government of India. It was set up in May 1989 as Centre for Electronics Design & Technology of India (CEDTI), Mohali. In December 2002, CEDTI Mohali merged with C-DAC with a primary mandate to promote high end R&D.
                        </p>

                        <p className="para">
                            C-DAC, Mohali operates from its own impressive building having a covered area of approximately 4300 sq. mts. The centre is located in the ELTOP (Electronics Town of Punjab) Complex amidst a large number of industries, manufacturing electronic products relating to computers, peripherals, communication equipment and components, offering a great professional challenge to the faculty and students of the Centre.
                        </p>

                        <p className="para">
                            As part of the mandate given to C-DAC, Mohali to generate manpower to address the growing demand for trained manpower in the extremely fast moving sector of Electronics & Information Technology C-DAC, Mohali has established its ACSD (Academic & Consultancy Services Division). ACSD has been providing high-end training in the field of hardware and software, running M.Tech programs along with its Research and Development activities in various fields viz., Electronic Product Design & Technology (EPDT), Very Large Scale Integration (VLSI) Design and Embedded System (ES)from 2003. From Year 2020, we are also running M.Tech in Artificial Intelligence & Cyber Security.
                        </p>

                        <p className="para">
                            Intellectual alertness, creativity and talent for innovation go into the making of an engineering leader today and continue to be essential for professional competence tomorrow. The candidates selected for admission live in pleasant surroundings of intellectually stimulating campus, use the most modern equipments and laboratory facilities available and go through the specialised courses designed to meet the challenge of the future. The teaching methods rely on direct personal contact between the teachers and the students. Living in such an environment with people having similar goals and aspirations is an exciting experience during one’s academic life and is of considerable value in one’s professional career.
                        </p>
                    </div>


                    <div className="sidebar">
                        <h3 className="sidebar-title">About Us</h3>
                        <ul>
                            <li className="active"><Link to="/overview">Overview</Link></li>
                            <li><Link to="/recognition">Recognition & Approval</Link> </li>
                            <li><Link to="/departmental_activities">Departmental Activities</Link> </li>
                            <li><Link to="/gallery">Photo Gallery</Link></li>
                            <li><Link to="/holidays_list">Holiday List</Link></li>
                            <li><Link to="/contact">Contact Information</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Overview
