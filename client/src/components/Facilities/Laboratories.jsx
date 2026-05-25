import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import "./Facilities.css"

function Laboratories()
{
    useEffect(() =>
    {
        document.title = "Laboratories"
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
                        <span className="crumb active">Laboratories</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Laboratories</h1>

                        <p className="para">Computing Facilities: Our lab is equipped with 120 high-performance PCs and 2 servers, all seamlessly connected via a robust 100Mbps LAN network, ensuring efficient and reliable computing resources. VLSI Lab: The VLSI lab boasts advanced industrial EDA tools, including Cadence, Synopsys, Siemens, and Ansys, along with FPGA kits. This state-of-the-art facility supports cutting-edge electronic design and development projects. EPDT & Embedded Systems Lab: Our EPDT & Embedded Systems Lab is equipped with a comprehensive suite of tools such as MATLAB, PIC kits, Keil compiler, Micro C, Visual DSP++ 3.5, MP Lab compiler, and Linux. These resources are designed to facilitate in-depth training and development in embedded systems. Classroom Technology: Each classroom is outfitted with an LCD projector and is fully air-conditioned, providing an optimal learning environment for students.</p>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Facilities</h3>
                        <ul>
                            <li><Link to="/library">Library</Link></li>
                            <li className="active"><Link to="/laboratories">Laboratories</Link> </li>
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

export default Laboratories
