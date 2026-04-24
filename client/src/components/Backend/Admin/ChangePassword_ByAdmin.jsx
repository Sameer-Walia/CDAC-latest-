import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function ChangePassword_ByAdmin()
{

    const [collapse, setCollapse] = useState(false);
    const [loading, setloading] = useState(false);
    const navi = useNavigate();

    const { email } = useSelector((state) => state.teacher)

    const [currpass, setcurrpass] = useState();
    const [newpass, setnewpass] = useState();
    const [cnewpass, setcnewpass] = useState();

    useEffect(() =>
    {
        document.title = "Change Password"
    }, [])


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
                    <h1 className='hd text-center'>Change Password</h1>

                    <form name="updateform" onSubmit>
                        <div className="form-container">

                            <div className="form-group">
                                <label>Current Password</label>
                                <input type="password" name="currpass" placeholder="current password" required=" " onChange={(e) => setcurrpass(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" name="newpass" placeholder="new password" required=" " onChange={(e) => setnewpass(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" name="cnewpass" placeholder="confirm new password" required=" " onChange={(e) => setcnewpass(e.target.value)} />
                            </div>

                            <button type="submit" className="register-button mt-3" disabled={loading}>
                                {loading ? "Changing Password..." : "Change Password"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ChangePassword_ByAdmin

