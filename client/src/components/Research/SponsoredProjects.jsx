import { Link } from "react-router-dom"
import Footer from "../Footer/Footer";
import "./Research.css"
import { useEffect } from "react";

function SponsoredProjects()
{
    useEffect(() =>
    {
        document.title = "Sponsored Projects";
    }, []);

    return (
        <div>
            <div id="Research_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">Research & Consultancy</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Sponsored Projects</span>
                    </div>
                </div>

                <div className="container divide py-3">
                    <div className="content">
                        <h1 className="title hd">Sponsored Projects</h1>

                        <h4>1. Irrigation Scheduler-Programmable System</h4>

                        <p className="para">To improve farm productivity, and to improve effectiveness of resources, mechanization of agricultural equipment has played a major role. There is need to accelerate development of equipment which makes and enhances productivity. “Development of Irrigation Scheduler-Programmable System” which is jointly handled by IARI, Pusa New Delhi, MERADO Ludhiana and C-DAC Mohali. The electronic part of the Irrigation Scheduler is being developed by ACSD, C-DAC Mohali.</p>

                        <p className="para">Irrigation scheduling consists of applying the right amount of water to the crop at the right time. Farmers can use many criterias for irrigation scheduling e.g. (i) intuition, (ii) calendar days since the last rainfall, (iii) crop evapo-transpiration, and (iv) soil water. One of the most important components of an irrigation system is the irrigation controller. The controller turns the automated irrigation system on and off at the time slots selected by the user. The properly scheduled controller results in significant water saving and lower water bills. Automatic solenoid valves, which control the flow of water to different parts of the field, open and close upon a signal from the controller. Once programmed, the controller determines when, how often, and how long each valve should open/close.</p>

                        <img src="/assets/images/r1.png" className="img-fluid custom-img "></img>

                        <h4 className="pt-5">2. Design & Development of GPS & GPRS based Portable Soil Nutrients Composition Analyzer System with the Soil Database Web PortalM</h4>

                        <p className="para">To improve farm productivity, and to improve effectiveness of resources, mechanization of agricultural equipment has played a major role. There is need to accelerate development of equipment which makes and enhances productivity. “Development of Irrigation Scheduler-Programmable System” which is jointly handled by IARI, Pusa New Delhi, MERADO Ludhiana and C-DAC Mohali. The electronic part of the Irrigation Scheduler is being developed by ACSD, C-DAC Mohali.</p>

                        <p className="para">Irrigation scheduling consists of applying the right amount of water to the crop at the right time. Farmers can use many criterias for irrigation scheduling e.g. (i) intuition, (ii) calendar days since the last rainfall, (iii) crop evapo-transpiration, and (iv) soil water. One of the most important components of an irrigation system is the irrigation controller. The controller turns the automated irrigation system on and off at the time slots selected by the user. The properly scheduled controller results in significant water saving and lower water bills. Automatic solenoid valves, which control the flow of water to different parts of the field, open and close upon a signal from the controller. Once programmed, the controller determines when, how often, and how long each valve should open/close.</p>

                        <img src="/assets/images/r1.png" className="img-fluid custom-img "></img>

                        <h4 className="pt-5">3. To Detect, Quantify and Classify insects/eggs in crops using Smartphone combined with Foldscope?</h4>

                        <p className="para">For detection of worms on crops image processing will be employed on smartphone app combined with foldscope. Steps are :
                            <ol>
                                <li>Image acquisition through foldscope combined with smartphone</li>
                                <li>Processing of Data via Android and iOS application into preprocessed image</li>
                                <li>Segmentation of components into the useful segments</li>
                                <li>Implementation of algorithms for Background subtraction for Detection, Quantification and Classification of insect/Egg.</li>
                            </ol>
                        </p>

                        <img src="/assets/images/r2.png" className="img-fluid custom-img dimension"></img>

                        <h4 className="pt-5">4. Qualitative study of technologies designed using Artificial Intelligence for improving healthcare services in the Indian context</h4>

                        <p className="para">To identify technologies designed in the area of Healthcare based Artificial Intelligence and to facilitate collaboration amongst industries and startups working in Artificial Intelligence- Health to improve healthcare services in India.</p>

                        <img src="/assets/images/r3.png" className="img-fluid custom-img "></img>

                    </div>


                    <div className="sidebar">
                        <h3 className="sidebar-title">Research & Consultancy</h3>
                        <ul>
                            <li><Link to="/overview">Publications</Link></li>
                            <li className="active"><Link to="/sponsored_projects">Sponsored Projects</Link> </li>
                            <li><Link to="/student_projects">Student Projects</Link> </li>
                        </ul>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SponsoredProjects
