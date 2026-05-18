import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

function My_Thesis()
{

    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate()

    const { batch, course, studentID } = useSelector((state) => state.student)
    const [allteacheremail, setallteacheremail] = useState([]);
    const [teacheremail, setteacheremail] = useState("");
    const [teachername, setteachername] = useState("");

    useEffect(() =>
    {
        document.title = "Thesis"
    }, [])

    useEffect(() =>
    {
        fetchteacheremail()
    }, [])

    async function fetchteacheremail()
    {
        try
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetchTeacheremail`);

            if (resp.data.statuscode === 1)
            {
                setallteacheremail(resp.data.allteacher_email)
            }
            else 
            {
                toast.warn(resp.data.msg)
                setallteacheremail([])
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
            <div id="student_page" className="p-4">

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
                        <Link to="/studenthome" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Student Corner</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Thesis</span>
                    </div>
                </div>

                <h1 className="text-center  hd">Thesis</h1>

                <div className="attendance-filter-box">

                    <div className="filter-group">
                        <label>Teacher Email</label>
                        <select
                            value={teacheremail}
                            onChange={(e) =>
                            {
                                const selectedEmail = e.target.value;
                                setteacheremail(selectedEmail);
                                const selectedTeacher = allteacheremail.find((item) => item.email === selectedEmail);
                                setteachername(selectedTeacher?.name || "");
                            }}
                            required
                        >
                            <option value="">Select Teacher Email</option>
                            {
                                allteacheremail && allteacheremail.length > 0 ?
                                    allteacheremail.map((item, index) =>
                                        <option key={index} value={item.email}>
                                            {item.email}
                                        </option>
                                    ) : null
                            }
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Teacher Name</label>
                        <input type="text" value={teachername} placeholder="Teacher Name" required disabled />
                    </div>

                </div>

            </div>

            <Footer />

        </div>
    )
}

export default My_Thesis
