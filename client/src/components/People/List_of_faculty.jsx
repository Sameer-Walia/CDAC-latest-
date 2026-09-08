import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import { useEffect } from "react"

function List_of_faculty()
{
    useEffect(() =>
    {
        document.title = "Faculty"
    }, [])

    return (
        <div>
            <div id="people_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">People </span>
                        <span className="separator">›</span>
                        <span className="crumb active">Faculty</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Faculty</h1>
                        <p className="para">
                            The main strength of the ACSD is its dedicated and committed faculty who nurture the budding scientists and professionals through effective teaching and practical training. The entire faculty has hands-on experience in industry and research. Most of the faculty has undertaken a number of research projects sponsored by various funding agencies, and also offer consultancy to major industries across the country. In addition to the regular faculty, ACSD is inviting visiting faculty form competitive institutes such as IIT Ropar, IISC Banglore, NIT Jalandar, NIT Hamirpur, PEC University, Panjab University, Thapar University and SCL Mohali.
                        </p>

                        <div id="people_faculty_table" className="table-responsive mt-4">
                            {/* <table className="table table-bordered table-hover  text-center align-middle"> */}
                            <table className="table custom-table text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Qualification</th>
                                        <th>Branch</th>
                                        <th>E-Mail ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Sanjay Madan</td>
                                        <td>Assistant Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>msanjay@cdac.in </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jaspal Singh</td>
                                        <td>Associate Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M. Tech. Embedded System</td>
                                        <td>jaspal@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Preeti Bali </td>
                                        <td>Associate Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M. Tech. Embedded System</td>
                                        <td>preet@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Manjit Kaur</td>
                                        <td>Assistant Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M. Tech. VLSI Design</td>
                                        <td>manjit@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Gurmohan Singh</td>
                                        <td>Assistant Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M. Tech. VLSI Design</td>
                                        <td>gurmohan@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Sunil Kumar Chille</td>
                                        <td>Associate Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>sunil@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Mandeep Singh</td>
                                        <td>Associate Professor</td>
                                        <td>Ph.D, M.Tech., B.Tech.</td>
                                        <td>M. Tech. Embedded System</td>
                                        <td>mandeep@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>Sanjay P Sood</td>
                                        <td>Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>sanjay@cdac.in </td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>Navdeep Singh </td>
                                        <td>Assistant Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>navdeep@cdac.in </td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>Sanjeev Kumar</td>
                                        <td>Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>sanjeev@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>Rakesh Kumar Sehgal</td>
                                        <td>Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>rks@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>Sonia Dosanjh</td>
                                        <td>Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>soniad@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>13</td>
                                        <td>Mikanshu Rani</td>
                                        <td>Assistant Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M.Tech. Computer Science & Engineering (Artificial Intelligence)</td>
                                        <td>mikanshu6406@gmail.com  </td>
                                    </tr>
                                    <tr>
                                        <td>14</td>
                                        <td>Dr.Balwinder Singh</td>
                                        <td>Associate Professor</td>
                                        <td>Ph.D, M.Tech., B.Tech.</td>
                                        <td>M. Tech. VLSI Design</td>
                                        <td>balwinder.cdacmohali@gmail.com </td>
                                    </tr>
                                    <tr>
                                        <td>15</td>
                                        <td>SONIYA</td>
                                        <td>Assistant Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M. Tech. VLSI Design</td>
                                        <td>mssoniya@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>16</td>
                                        <td>Rohan Dhaload</td>
                                        <td>Assistant Professor</td>
                                        <td>M.Tech., B.Tech.</td>
                                        <td>M. Tech. Embedded System</td>
                                        <td>rohandhaload@cdac.in  </td>
                                    </tr>
                                    <tr>
                                        <td>17</td>
                                        <td>KOMAL</td>
                                        <td>Assistant Professor</td>
                                        <td>Ph.D, M.Tech., B.Tech.</td>
                                        <td>M. Tech. VLSI Design</td>
                                        <td>drkomal@cdac.in  </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">People</h3>
                        <ul>
                            <li className="active"><Link to="#">Faculty</Link></li>
                            <div className="ps-4">
                                <li><Link to="/hod">Head/ Coordinator of Department</Link> </li>
                                <li className="active"><Link to="/list_of_faculty">List of Faculty</Link> </li>
                            </div>
                            <li><Link to="/staff">Staff</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default List_of_faculty
