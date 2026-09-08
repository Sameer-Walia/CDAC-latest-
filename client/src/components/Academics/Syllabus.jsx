import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import { useEffect } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Syllabus()
{

    const [loading, setloading] = useState(false);
    const [allsyllabus_data, setallsyllabus_data] = useState([]);
    const navi = useNavigate()

    useEffect(() =>
    {
        document.title = "Syllabus"
    })

    useEffect(() =>
    {
        fetchsyllabuslist()
    }, [])

    async function fetchsyllabuslist()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_all_syllabusList_for_student`);

            if (resp.data.statuscode === 1)
            {
                setallsyllabus_data(resp.data.allsyllabus_list)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setallsyllabus_data([]);
            }
        }
        catch (e)
        {
            toast.error("Error Occured : " + (e.response?.data?.msg || e.message))
        }
        finally
        {
            setloading(false)
        }
    }

    return (
        <div>
            <div id="academics_page" className="p-4">

                {loading && (
                    <div className="overlay">
                        <div>
                            <div className="spinner"></div>
                            <p style={{ color: "white", marginTop: "10px" }}>
                                Please wait...
                            </p>
                        </div>
                    </div>
                )}

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Student Corner</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Syllabus</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Syllabus</h1>
                        <div id="academic_syllabus_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}

                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>S.NO.</th>
                                        <th>Subject Name</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allsyllabus_data && allsyllabus_data.length > 0 ?
                                        allsyllabus_data.map((item, index) =>
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.subjectname}</td>
                                                <td>
                                                    <a
                                                        href={`${import.meta.env.VITE_API_URL}/uploads/syllabus/${item.syllabus_pdf}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View PDF
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan="12" style={{ textAlign: "center" }}>
                                                No Data Found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                    {/* <div className="sidebar">
                        <h3 className="sidebar-title">Academics</h3>
                        <ul>
                            <li><Link to="/academic_overview">Academic Overview</Link></li>
                            <li><Link to="/programmes">Programmes</Link></li>
                            <div className="ps-4">
                                <li><Link to="/mtech_ai">M.Tech – Artificial Intelligence (AI)</Link> </li>
                                <li><Link to="/mtech_vlsi">M.Tech - VLSI Design</Link> </li>
                                <li><Link to="/mtech_es">M.Tech - Embedded Systems (ES)</Link> </li>
                            </div>
                            <li><Link to="/academic_calendar">Academic Calendar</Link> </li>
                            <li className="active"><Link to="/syllabus">Syllabus</Link> </li>
                            <li><Link to="/fees_structure">Fee Structure</Link> </li>
                        </ul>
                    </div> */}
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Syllabus
