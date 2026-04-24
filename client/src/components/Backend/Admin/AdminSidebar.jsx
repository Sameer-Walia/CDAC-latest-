import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Admin.css";

function AdminSidebar({ collapse, setCollapse })
{

    const [open, setOpen] = useState(false);

    const handleCollapse = () =>
    {
        if (window.innerWidth > 768)
        {
            setCollapse(prev => !prev);
        }
    };

    const [activeTab, setActiveTab] = useState("");

    useEffect(() =>
    {
        const timer = setTimeout(() =>
        {
            const savedTab = localStorage.getItem("tabLink");
            if (savedTab)
            {
                setActiveTab(savedTab);
            }
        }, 10);

        return () => clearTimeout(timer);
    }, []);


    const handleTabClick = (tab) =>
    {
        setActiveTab(tab);
        localStorage.setItem("tabLink", tab);
    };

    return (
        <div id="admin_page">

            <div className="admin_container">

                {open && (
                    <div
                        className="overlay_two"
                        onClick={() => setOpen(false)}
                    ></div>
                )}

                <button className="menu-btn" onClick={() => setOpen(!open)}>
                    ☰
                </button>

                <div className={`admin_sidebar ${open ? "active" : ""} ${collapse ? "collapsed" : ""}`}>

                    <div className="top-section">
                        <h2 className="logo">{collapse ? "AP" : "Admin Panel"}</h2>

                        <button className="collapse-btn" onClick={handleCollapse}>
                            {collapse ? "➡" : "⬅"}
                        </button>
                    </div>

                    <ul>
                        <li data-title="Teacher" className={activeTab === "teacherlist" ? "active" : ""}>
                            <Link to="/adminPanel" onClick={() => handleTabClick("teacherlist")}>
                                <span className="icon">👨‍🏫</span>
                                <span className="text">Teacher</span>
                            </Link>
                        </li>

                        <li data-title="Users" className={activeTab === "studentlist" ? "active" : ""}>
                            <Link to="/all_students_list_to_admin" onClick={() => handleTabClick("studentlist")}>
                                <span className="icon">👤</span>
                                <span className="text">Students</span>
                            </Link>
                        </li>

                        <li data-title="Fees" className={activeTab === "feesList" ? "active" : ""}>
                            <Link to="/all_fees_list_to_admin" onClick={() => handleTabClick("feesList")}>
                                <span className="icon">💸</span>
                                <span className="text">Fees</span>
                            </Link>
                        </li>

                        <li data-title="adminprofile" className={activeTab === "adminprofile" ? "active" : ""}>
                            <Link to="/adminprofile" onClick={() => handleTabClick("adminprofile")}>
                                <span className="icon">💬</span>
                                <span className="text">My Profile</span>
                            </Link>
                        </li>

                        <li data-title="changepassword_for_admin" className={activeTab === "changepassword" ? "active" : ""}>
                            <Link to="/changepassword_for_admin" onClick={() => handleTabClick("changepassword")}>
                                <span className="icon">📊</span>
                                <span className="text">Change Password</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
        </div >
    )
}

export default AdminSidebar
