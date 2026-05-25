import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import "./Facilities.css"

function Library()
{
    useEffect(() =>
    {
        document.title = "Library"
    }, [])

    return (
        <div>
            <div id="facilities_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Facilities</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Library</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Library</h1>

                        <p className="para">Our library offers an extensive range of hard copy resources and VCD/DVDs, organized under an "Open Access System" for easy browsing. With approximately 7,800 books, 1,000 manuals, 200 data books, and 70 periodicals/journals, it provides a well-rounded collection including textbooks, foundational texts, and supplementary readings. Beyond engineering and technology, our library is stocked with materials in literature, general knowledge, aptitude, applied sciences, humanities, and social sciences. We are committed to meeting students' course book needs by acquiring multiple copies of books from various authors on the same subject, ensuring comprehensive coverage and support for academic growth.</p>

                        <p className="para">Books can be borrowed by students for up to 15 days, excluding reference materials, data books, directories, handbooks, reports, and standards, which remain in the library. If a requested book is not available, we procure it based on members' requests. Our reprographic facility is accessible to all members and students for copying and printing needs. Additionally, IEEE and ACM online journals and conference proceedings are available on-site. Faculty members benefit from dedicated reading carrels, providing a quiet space for focused study and research.</p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Facilities</h3>
                        <ul>
                            <li className="active"><Link to="/library">Library</Link></li>
                            <li><Link to="/laboratories">Laboratories</Link> </li>
                            <li><Link to="/hostel">Hostels</Link> </li>
                            <li><Link to="/antiragging">Anti Ragging</Link> </li>
                            <li><Link to="#">Alumni</Link> </li>
                            <li><Link to="/sports">Sports</Link> </li>
                        </ul>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Library
