import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import TeacherSidebar from "./TeacherSidebar";
import "./Teacher.css";

function TeacherProfile()
{

    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate();

    const { email } = useSelector((state) => state.teacher)
    const [profile, setprofile] = useState(null)

    useEffect(() =>
    {
        document.title = "Teacher Profile"
    }, [])

    useEffect(() =>
    {
        if (email)
        {
            fetchTeacherProfile()
        }
    }, [email])

    async function fetchTeacherProfile()
    {
        try 
        {
            if (!email?.trim())
            {
                return toast.error("Email not found.")
            }
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_teacher_profile/${email}`, { withCredentials: true })
            if (resp.data.statuscode === 1)
            {
                // toast.success(resp.data.msg)
                setprofile(resp.data.profile)
            }
            else
            {
                toast.error(resp.data.msg)
                setprofile(null)
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

    function edit_profile_of_teacher()
    {
        navi("/edit_profile_of_teacher")
    }

    return (
        <div id="Teacher_page">

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

            <div className="teacher_container">

                <TeacherSidebar collapse={collapse} setCollapse={setCollapse} />

                <div className={`teacher_maincontent ${collapse ? "expand" : ""}`}>
                    <h1 className='hd text-center'>My Profile</h1>

                    {
                        profile &&
                        <div className="profile_card">

                            <div className="profile_left">
                                <div className="profile_img">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user" />
                                </div>

                                <h2>{profile?.name || ""}</h2>

                                <button className="edit_btn mt-3" onClick={edit_profile_of_teacher}>
                                    ✏ Edit Profile
                                </button>
                            </div>

                            <div className="profile_right">

                                <div className="profile_grid">
                                    <div>
                                        <p className="profilelabel">Email</p>
                                        <p>{profile?.email || ""}</p>
                                    </div>

                                    <div>
                                        <p className="profilelabel">Phone</p>
                                        <p>{profile?.phone || ""}</p>
                                    </div>

                                    <div>
                                        <p className="profilelabel">Usertype</p>
                                        <p>{profile?.usertype || ""}</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default TeacherProfile
