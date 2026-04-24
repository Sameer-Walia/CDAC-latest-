import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Mtech_Es()
{
    return (
        <div>
            <div id="academics_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Academics </span>
                        <span className="separator">›</span>
                        <Link to="/programmes" className="crumb">Programmes</Link>
                        <span className="separator">›</span>
                        <span className="crumb active">M.Tech - Embedded Systems(ES)</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">M.Tech - Embedded Systems(ES)</h1>

                        <p className="para">
                            The M.Tech at C-DAC Mohali is an intensive skill based and practice oriented programme, which incorporates assignments, industry relevant projects, dissertation work etc., and are delivered through regular and expert guest faculty in the region with extended laboratory operations for 7 days a week to provide a stimulation and high end teaching learning experience.
                        </p>

                        <p className="para">
                            C-DAC, Mohali started M.Tech in Embedded System (ES) in the year 2011, which is approved by AICTE and affiliated to PTU, Jalandhar. The programme is well-designed and is conducted on semester basis. The objective is to build a strong foundation and develop the required skill set in students associated with the Electronics and Information Technology, Electronic Product Design and Embedded Systems. The ES Labs include PCB Design Lab and Micro Controllers Lab, which are equipped with latest softwares like RTOS, RTLinux, OrCad, MATLAB, AVR Studios, Keil compiler, Micro C, Visual DSP++ 3.5, MP Lab compiler and in hardware ARM, PIC kits. Students are motivated to take up research in their field of interest and full support is provided to design and develop a market ready product during the thesis work.
                        </p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Academics</h3>
                        <ul>
                            <li><Link to="/academic_overview">Academic Overview</Link></li>
                            <li className="active"><Link to="/programmes">Programmes</Link></li>
                            <div className="ps-4">
                                <li><Link to="/mtech_ai">M.Tech – Artificial Intelligence (AI)</Link> </li>
                                <li><Link to="/mtech_vlsi">M.Tech - VLSI Design</Link> </li>
                                <li className="active"><Link to="/mtech_es">M.Tech - Embedded Systems (ES)</Link> </li>
                            </div>
                            <li><Link to="/academic_calendar">Academic Calendar</Link> </li>
                            <li><Link to="/syllabus">Syllabus</Link> </li>
                            <li><Link to="/fees_structure">Fee Structure</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>

    )
}

export default Mtech_Es
