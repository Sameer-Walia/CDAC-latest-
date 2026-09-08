import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer/Footer';
import Staff_Register from './Register/Staff_Register';
import Staff_Login from './Login/Staff_Login';
import "./Login/Login.css";

function Authpage()
{

    const location = useLocation();
    const path = location.pathname

    const activeButton = path === "/staff_register" ? "staff_register" : "staff_login";

    return (
        <div id="authpage">
            <div className="container">
                <div className="row ">
                    <div className="col-lg-6 col-12 ">
                        <img src={`/assets/images/login.jpg`} alt="" className="img-fluid authimage " />
                    </div>
                    <div className="col-lg-6 col-12 text-center mb-5">

                        <div className={`containerdiv mt-5 `}>
                            <Link
                                to="/staff_login"
                                className={`link ${activeButton === "staff_login" ? "active" : "inactive"}`}
                                style={{ fontSize: "0.9rem" }}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/staff_register"
                                className={`link ${activeButton === "staff_register" ? "active" : "inactive"}`}
                                style={{ fontSize: "0.9rem" }}
                            >
                                Register
                            </Link>

                        </div>
                        <p className="note-text">Note :- For Staff use only</p>
                        {
                            activeButton === "staff_register" ?
                                <>
                                    <Staff_Register />
                                </> : <Staff_Login />
                        }

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Authpage
