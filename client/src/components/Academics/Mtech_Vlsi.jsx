import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { useEffect } from 'react'

function Mtech_Vlsi()
{
    useEffect(() =>
    {
        document.title = "M.Tech - VLSI Design"
    }, [])

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
                        <span className="crumb active">M.Tech - VLSI Design</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">M.Tech - VLSI Design</h1>

                        <p className="para">
                            The M.Tech at C-DAC Mohali is an intensive skill based and practice oriented programme, which incorporates assignments, industry relevant projects, dissertation work etc and are delivered through regular and expert guest faculty in the region with extended laboratory operations for 7 days a week to provide a stimulation and high end teaching learning experience.
                        </p>

                        <p className="para">
                            C-DAC Mohali introduced the Master of Technology in VLSI Design at its Mohali campus ACS Division in the year 2004 to target the field of digital electronics, which is approved by AICTE & affiliated to PTU Jalandhar. VLSI design is an intrinsic part of electronics today with digital design being implemented on FPGA. As the complexity of digital circuits is increasing with time, thus we commit to generate quality engineers with skills to conquer the challenges in field of electronics.
                        </p>

                        <p className="para">
                            The programme incorporates regular assignments and high quality thesis work. All laboratories are well equipped with adequate number of Industry standard Design Tools supported with FPGA, DSP and Microcontroller development boards. VLSI labs are facilitated with Cadence EDA tools having 40 licenses for academic & Research purpose and 30 FPGA kits and 20 AVR kits. The laboratory facilities are available for 24 hours and 7 days a week to provide a stimulating and high-end learning experience. The program is conducted and monitored by highly qualified faculty with sole aim to produce the highest quality Industry ready manpower equipped to take up challenging assignments in Research and Industry in the areas of VLSI Design.
                        </p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Academics</h3>
                        <ul>
                            <li><Link to="/academic_overview">Academic Overview</Link></li>
                            <li className="active"><Link to="/programmes">Programmes</Link></li>
                            <div className="ps-4">
                                <li><Link to="/mtech_ai">M.Tech – Artificial Intelligence (AI)</Link> </li>
                                <li className="active"><Link to="/mtech_vlsi">M.Tech - VLSI Design</Link> </li>
                                <li><Link to="/mtech_es">M.Tech - Embedded Systems (ES)</Link> </li>
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

export default Mtech_Vlsi
