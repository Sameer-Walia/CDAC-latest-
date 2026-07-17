import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import "./Admissions.css"
import { useEffect } from "react"

function Procedure()
{
    useEffect(() =>
    {
        document.title = "Procedure"
    }, [])

    return (
        <div>
            <div id="admissions_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Admissions </span>
                        <span className="separator">›</span>
                        <span className="crumb active">Procedure</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <a
                            href="/pdf/AdmissionForm.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary mb-4"
                        >
                            Admission Form
                        </a>

                        <h1 className="title hd">M. Tech. Admission</h1>
                        <p className="para">Interested candidates are required to fill Online Registration Form (Google Form). After verification of eligibility from the data so provided by the candidates, marit( on the basis of %age in B. Tech and GATE Qualification) will be announced on website for eligible candidates. Further process of admission will be communicated on our site as well as by email to eligible candidates.</p>

                        <h1 className="title hd">M. Tech. Admission</h1>
                        <p className="para">The candidates are eligible for M. Tech admission in C-DAC, Mohali based on the data provided by them (as per the list uploaded). We are conducting admission in online mode. Candidates are required to submit the following scanned documents by email (in single Pdf file) : acsdcofficial@gmail.com or mtech-mohali@cdac.in in online mode.</p>
                        <ol>
                            <li>Admission form duly filled and signed</li>
                            <li>B. Tech DMCs or B. Tech Provisional Degree or B. Tech completion certificate</li>
                            <li>Provisional admission fees</li>
                            <li>DOB Proof</li>
                        </ol>
                        <p className="para">Candidate are required to visit campus and submit above said documents for admission in offline mode.</p>

                        <h4 className="title ">Kindly note the important instruction for Admission in M. Tech:</h4>
                        <ul>
                            <li>All admission to M. Tech programmes shall be provisional until the verification of original documents and subject to approval by competent authority.</li>
                            <li>Mere eligibility in the stream doesn’t assure admission in the same preferred stream.</li>
                            <li>List of eligible candidates does not imply admission, which is subject to assessment procedure and availability of seats or norms.</li>
                            <li>C-DAC reserves the right to have last word in all the matters related to admission.</li>
                            <li>The eligible candidates are required to deposit a 25000/- online by NEFT/ Net banking/Credit Card/Debit Card/Cash or by DD in favour of Director C-DAC, Mohali and this fee will be adjusted in First semester fees.</li>
                            <li>Details for Online transfer at Bank Name: State Bank of India, Account No. 55034442545, IFSC Code: SBIN0050502, Branch: SBI Phase 7 Mohali.</li>
                            <li>Gate qualified students will get 12400/- scholarship per month as per AICTE Norms.</li>
                            <li>OBC/SC/ST scholarships are available through UGC/State Govt. norms.</li>
                        </ul>

                        <h4 className="title ">Refund Policy</h4>
                        <ul>
                            <li>In case a student withdraws from the Provisional Admission, his/ her fee shall be refunded by the C-DAC after deduction of Rs. 2000/- only.</li>
                            <li>However, if the student is not selected, then total provisional admission fees will be refunded.</li>
                        </ul>

                        <div id="admission_procedure_table" className="table-responsive mt-4">
                            <table className="custom-fee-table mt-5">
                                <thead>
                                    <tr>
                                        <th colSpan="3" className="table-title">ONLINE ADMISSION FEES TRANSFER DETAILS</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr><td>1</td><td>NAME</td><td>DIRECTOR CDAC MOHALI</td></tr>
                                    <tr><td>2</td><td>BANK</td><td>STATE BANK OF INDIA</td></tr>
                                    <tr><td>3</td><td>ACCOUNT NO.</td><td>55034442545</td></tr>
                                    <tr><td>4</td><td>IFSC Code</td><td>SBIN0050502</td></tr>
                                    <tr><td>5</td><td>Branch</td><td>SBI Phase 7 Mohali</td></tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Admissions</h3>
                        <ul>
                            <li className="active"><Link to="/procedure">Admission Procedure</Link></li>
                            <li><Link to="/eligibility_criteria">Eligibility Criteria</Link> </li>
                            <li><Link to="#">Information Brochure</Link> </li>
                            <li><Link to="/admission_helpline">Admission Helpline</Link> </li>
                            <li><Link to="/seat_distribution">Seat Distribution</Link> </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Procedure
