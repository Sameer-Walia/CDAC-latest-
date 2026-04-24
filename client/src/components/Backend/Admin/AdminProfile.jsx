import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./admin.css";

function AdminProfile()
{

    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate();

    const { email } = useSelector((state) => state.teacher)
    const [profile, setprofile] = useState(null)

    useEffect(() =>
    {
        document.title = "My Profile"
    }, [])


    useEffect(() =>
    {
        if (email)
        {
            fetchadminprofile()
        }
    }, [email])

    async function fetchadminprofile()
    {
        try 
        {
            setloading(true)
            const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/fetch_admin_profile/${email}`,)
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

    function edit_profile_of_admin()
    {
        navi("/edit_profile_of_admin")
    }

    return (
        <div id="admin_page">

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

            <div className="admin_container">

                <AdminSidebar collapse={collapse} setCollapse={setCollapse} />

                <div className={`admin_maincontent ${collapse ? "expand" : ""}`}>
                    <h1 className='hd text-center'>My Profile</h1>

                    {
                        profile &&
                        <div className="profile_card">

                            <div className="profile_left">
                                <div className="profile_img">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user" />
                                </div>

                                <h2>{profile?.name || ""}</h2>

                                <button className="edit_btn mt-3" onClick={edit_profile_of_admin}>
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

export default AdminProfile
