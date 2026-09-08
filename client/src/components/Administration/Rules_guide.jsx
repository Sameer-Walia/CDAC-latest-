import React from 'react'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Rules_guide()
{

    useEffect(() =>
    {
        document.title = "Rules & Guidelines"
    }, [])


    return (
        <div>
            <div id="adminstration_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Administration</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Rules & Guidelines</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Rules & Guidelines</h1>
                        <div className="rules-container">
                            <h2 className="section-title">Leave and Attendance</h2>
                            <ol className="rules-list">
                                <li>Student who is absent from the institute continuously for two weeks without prior permission from the HOD, may not be permitted to continue the semester and may be asked to drop unless satisfactory explanation / proof for the same is provided by him/her through the HOD duly accepted by the Principal/Director, CDAC, Mohali.</li>

                                <li>If a student does not turn up after winter or summer vacations, his/her name will be sent to Principal/Director for termination from the programme. If approved by the Principal/Director, his/her name will be removed from the institute rolls with effect from the date on which he/she actually appeared in the last semester examination.</li>

                                <li>If a student does not appear to the end semester examination, then the concerned HOD will forward the name of the student for termination to the Principal/Director.</li>

                                <li>Students who are in receipt of the scholarship may be permitted to entitle a total of 30 days leave in a year without loss of scholarship and they are not entitled for vacation.</li>

                                <li>Minimum of 75 percent attendance in each subject is necessary for being admitted to examination in that particular subject. Besides, the students must carry out and acquaint themselves with laboratory and practical work covered during the year to the satisfaction. Students are required to pursue their studies regularly and those whose performance in the class tests is not satisfactory are liable to be detained by the Director from appearing the University Examinations. The detailed rules and syllabi of the University Examinations are available and every student is advised to get the latest copy of it for his / her own guidance.</li>

                                <li>Every student shall be offered theory/practical papers for examination as per the scheme of examination approved by the BoS of PTU, Jalandhar.</li>
                            </ol>

                            <h2 className="section-title">Medical Leave</h2>
                            <p className="rules-text">
                                Leave on medical ground, supported by a valid medical certificate, may be granted up to 8 days per semester.
                                Unavailed leave may be carried forward. However, medical leave should not exceed 15 days at a stretch.
                            </p>

                            <h2 className="section-title">Scholarship</h2>
                            <ul className="rules-list alpha">
                                <li>The students admitted to M.Tech / M.E. degree courses on the basis of valid GATE score are eligible to entitle scholarships according to the AICTE/MHRD norms. Grant of Scholarship is further subject to the availability of funds and on the fulfillment of conditions for such award.</li>

                                <li>GATE Scholars would be required to deliver a work load 8 to 10 hours per week related to teaching and research activities as assigned by the Head of Department.</li>

                                <li>Every student must submit a formal application for grant of Scholarship in the prescribed form within a week from the date of actually joining the Post Graduate Classes duly attested by concerned Head of the Department.</li>

                                <li>An awardees under post graduate scholarship scheme will not be allowed to receive additional scholarship or stipend or special allowance from any other source. In case of any candidate who is in receipt of such award, the same must be surrendered and the amount received as such should be refunded before the benefit of scholarship availed of.</li>

                                <li>Good conduct and regularity in attendance are also implied condition for the continuance of the scholarship.</li>

                                <li>If any candidate is found to be ineligible for the award of the scholarship for any reasons whatsoever including wrong information given by the student concerned, the scholarship will be cancelled and the total amount paid to him/her will be recovered in lump sum.</li>

                                <li>Unauthorized absence from the college will result in forfeiture of scholarship in part or in whole for the period of absence or subsequent to such absence.</li>

                                <li>A student who has not appeared in the Semester University Examination due to shortage of attendance or otherwise will be debarred from future payment of scholarship.</li>

                                <li>Unsatisfactory progress/misconduct of a student during the course may result in discontinuation of scholarship.</li>

                                <li>In order to be eligible to receive the scholarship, the student is required to submit an undertaking on a non judicial stamp paper that in case he/she does not fulfill the conditions as laid down by G.O.I in their letter No. F.3-16-(Part-II) 1.2, dated 7th April, 1989 as modified from time to time, have to refund the entire amount of scholarship without protest. The conditions to be fulfilled in addition to the general conditions mentioned earlier are:</li>
                                <ol className="rules-list">
                                    <li>He/she has to secure a first class in every semester examinations, passing all the subjects of that semester to become eligible for continuance of scholarship. Scholarship once discontinued due to any reason will not be continued again even if a student secures first class.</li>

                                    <li>He will not leave the course midway or appear in any competitive examination not related to Engineering and Technology.</li>
                                </ol>

                            </ul>

                            <h2 className="section-title">Rules for Adjustment / Refund of Fees</h2>
                            <ul className="rules-list alpha">
                                <li>If a candidate changes his / her college /branch through centralized Counseling conducted by PTU, his/her entire fee shall be transferred /refund to the new college allotted after deducting a processing fee of Rs. 1000/- only.</li>

                                <li>In case a student surrendering his /her seat, within 7 days of the end of the online counseling, he / she must submit application to the college and register online on PTU website www.ptu.ac.in. PTU shall only forward such cases to the concerned colleges and college must refund his / her full fee after deduction of Rs. 1000/- only.</li>
                            </ul>

                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Administration</h3>
                        <ul>
                            <li><Link to="/director">Director</Link></li>
                            <li className="active"><Link to="/rules_guidelines">Rules & guidelines</Link> </li>
                            <li><Link to="#">Notice</Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Rules_guide
