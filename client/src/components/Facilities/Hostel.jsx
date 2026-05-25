import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import "./Facilities.css"
import { useEffect } from 'react'

function Hostel()
{
    useEffect(() =>
    {
        document.title = "Hostel"
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
                        <span className="crumb active">Hostel</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Hostel</h1>

                        <p className="para">Boarding Facilities at ACSD, C-DAC Mohali Hostel Accommodations for Boys and Girls ACSD, C-DAC Mohali offers high-quality boarding facilities with separate hostels for boys and girls. Our well-managed hostels are organized with dedicated staff and continuous surveillance, ensuring a safe and comfortable living environment. Key Features of Our Hostels: Comfortable Living Spaces: Enjoy spacious rooms, providing both privacy and comfort. 24/7 Essential Services: Benefit from around-the-clock purified water supply and geysers for your convenience. Recreational and Fitness Facilities: Access large playgrounds for cricket and volleyball, along with a dedicated recreation hall featuring badminton courts and table tennis tables. Entertainment and Hobbies: Explore designated areas for entertainment, fitness, and pursuing personal hobbies, enhancing your overall campus experience. Secure and Well-Maintained: Experience a secure and well-maintained environment with dedicated staff ensuring your safety and comfort. Discover a well-rounded boarding experience at ACSD, C-DAC Mohali, where exceptional facilities support both academic success and personal well-being.</p>

                        <h1 className="title hd">Canteen</h1>

                        <p className="para">At C-DAC Mohali, students and visitors can enjoy top-notch dining options without needing to leave the campus. Our on-campus **canteen** serves a variety of delicious snacks and meals in a comfortable and relaxed setting, ideal for casual dining and socializing. The **mess** facility is renowned for its high standards of hygiene and food quality, consistently providing nutritious and flavorful meals. Both dining venues ensure a satisfying and convenient experience, making campus life at C-DAC Mohali both enjoyable and hassle-free.</p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Facilities</h3>
                        <ul>
                            <li><Link to="/library">Library</Link></li>
                            <li><Link to="/laboratories">Laboratories</Link> </li>
                            <li className="active"><Link to="/hostel">Hostels</Link> </li>
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

export default Hostel
