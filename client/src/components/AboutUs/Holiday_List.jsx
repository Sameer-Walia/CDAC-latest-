import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./AboutUs.css";

function Holiday_List()
{
    return (
        <div>
            <div id="about_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">About Us</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Holiday List</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Holiday List</h1>
                        <div id="about_holiday_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Date</th>
                                        <th>Holiday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>26 Jan 2026</td><td>Republic Day</td></tr>
                                    <tr><td>2</td><td>04 Mar 2025</td><td>Holi</td></tr>
                                    <tr><td>3</td><td>03 Apr 2026</td><td>Good Friday</td></tr>
                                    <tr><td>4</td><td>21 Mar 2026</td><td>Eid-ul-Fitr</td></tr>
                                    <tr><td>5</td><td>02 Apr 2026</td><td>Mahavir Jayanti</td></tr>
                                    <tr><td>6</td><td>01 Jun 2026</td><td>Buddha Purnima</td></tr>
                                    <tr><td>7</td><td>27 May 2026</td><td>Bakrid</td></tr>
                                    <tr><td>8</td><td>16 Jun 2026</td><td>Muharram</td></tr>
                                    <tr><td>9</td><td>15 Aug 2026</td><td>Independence Day</td></tr>
                                    <tr><td>10</td><td>04 Sep 2026</td><td>Janmashtami</td></tr>
                                    <tr><td>11</td><td>25 Sep 2026</td><td>Id-E-Milad</td></tr>
                                    <tr><td>12</td><td>02 Oct 2026</td><td>Gandhi Jayanti</td></tr>
                                    <tr><td>13</td><td>20 Oct 2026</td><td>Dussehra</td></tr>
                                    <tr><td>14</td><td>08 Nov 2026</td><td>Diwali</td></tr>
                                    <tr><td>15</td><td>25 Nov 2026</td><td>Guru Nanak Jayanti</td></tr>
                                    <tr><td>16</td><td>25 Dec 2026</td><td>Christmas</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">About Us</h3>
                        <ul>
                            <li><Link to="/overview">Overview</Link></li>
                            <li><Link to="/recognition">Recognition & Approval</Link> </li>
                            <li><Link to="/departmental_activities">Departmental Activities</Link> </li>
                            <li><Link to="/gallery">Photo Gallery</Link></li>
                            <li className="active"><Link to="/holidays_list">Holiday List</Link></li>
                            <li><Link to="/contact">Contact Information</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Holiday_List
