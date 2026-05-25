import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./StudentCorner.css"
import { useEffect } from 'react';

function StudentCounselling()
{
    useEffect(() =>
    {
        document.title = "Student Counselling";
    }, []);

    return (
        <div>
            <div id="studentcorner_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Student Corner</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Student Counselling</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Student Counselling</h1>
                        <p className='para'>Student Counseling at ACSD promotes Education and Career, psychological, mental or emotional counseling of the students, which leads to complete personality development and industry / society ready individuals. At the Institute level, the idea is to guide and help out students throughout their study, providing appropriate guidance at each stage of the student's development or progress. Students are assigned with faculty from day one and the faculty counselors closely associated with students to hear their problems and to improve their quality of life thus create a learning environment that facilitates their individual development.</p>

                        <p className='para'>In addition to internal counseling sessions, ACSD arranges expert counseling sessions also on personality development, stress management and for well being of the students throughout their walk in the institute.</p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Student Corner</h3>
                        <ul>
                            <li><Link to="/antiragging">Anti Ragging</Link></li>
                            <li><Link to="#">Alumni</Link></li>
                            <li><Link to="/sports">Sports</Link></li>
                            <li className="active"><Link to="/studentcounselling">Student Counselling</Link></li>
                            <li><a href="http://acsd.ac.in/readdata/Date%20sheet.pdf" target="_blank" rel="noopener noreferrer">Exam Date sheet</a></li>
                            <li><Link to="#">Exam Results</Link></li>
                            <li><a href="http://acsd.ac.in/readdata/TIME%20TABLE17.pdf" target="_blank" rel="noopener noreferrer">Time Table</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default StudentCounselling
