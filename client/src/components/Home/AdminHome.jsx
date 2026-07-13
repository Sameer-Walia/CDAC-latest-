import { Link } from "react-router-dom";
import Typewriter from "../Typewriter";
import "./Home.css";
import { useEffect } from "react";
// import Owlcrousel from "../OwlCrousel";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import Footer from "../Footer/Footer";
import MarqueeModule from "react-fast-marquee";
const Marquee = MarqueeModule.default;


function AdminHome()
{
    useEffect(() =>
    {
        document.title = "Admin Home Page"
    }, [])


    // useEffect(() =>
    // {
    //     AOS.init({
    //         duration: 1000, once: false, offset: 380, easing: "ease-in-out"
    //     });
    // }, []);


    return (
        <div>
            <div id="marquee_tag_home">
                <Marquee speed={80} pauseOnHover gradient={false}>

                    <div className="ms-5">
                        <a href="https://www.cdac.in/" target="_blank" rel="noopener noreferrer">
                            🎓 Welcome to C-DAC Mohali – Centre of Excellence in Advanced Computing & Skill Development!
                        </a>
                    </div>

                    <span style={{ margin: "0 40px" }} />

                    <a href="/programmes">
                        💻 Explore Industry-Oriented PG Degree Programmes in AI & Software Development!
                    </a>
                    <span style={{ margin: "0 40px" }} />

                    <a href="/placement_acsd">
                        🚀 Empowering Students with Industry-Focused Training, Innovation, and Excellent Placement Opportunities!
                    </a>

                    <span style={{ margin: "0 40px" }} />

                    <div className="me-5">
                        <a href="/student_projects">
                            🔬 Discover Research, High Performance Computing, Digital Transformation & Emerging Technologies at C-DAC Mohali!
                        </a>
                    </div>
                </Marquee>
            </div>

            <div id="movinghome" className="pd gr">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-12">
                            <h1 className=" hd main-heading">
                                <span className="text-black">WELCOME TO </span><span className="ccc"><Typewriter /></span>
                            </h1>
                            <p className="para my-5">
                                "Empowering innovation through advanced computing, industry-focused education, cutting-edge research, and world-class technology training."
                            </p>
                        </div>
                        <div className="col-lg-5 col-12 " data-aos="zoom-out-left" data-aos-delay="600">
                            <img src="/assets/images/CDAC_Image3.avif" alt="" className="img-fluid rounded custom-img" />
                        </div>
                    </div>
                </div>
            </div>

            <div id="aboutHome" className="pd ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 " data-aos="fade-up-right" data-aos-delay="100">
                            <h1 className=" mt-4 hd">Advancing Innovation Through Research and Development</h1>

                            <p className="para my-4">
                                C-DAC Mohali is a premier centre of the Ministry of Electronics and Information Technology (MeitY), Government of India, dedicated to research, innovation, and industry-oriented education.
                            </p>

                            <p className="para mb-4">
                                The centre offers nationally recognized Post Graduate Degree programmes, cutting-edge research, software development, Artificial Intelligence, Cyber Security, Big Data Analytics, Embedded Systems, and High Performance Computing.
                            </p>

                        </div>
                        <div className="col-lg-6 col-12 mt-lg-0 text-center " data-aos="fade-down-left" data-aos-delay="100">
                            <img src="/assets/images/CDAC_CIRCULAR_LOGO.png" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

            <div id="custom_bg">
                <div className="custom-background" >
                    <div className="custom-text-center">
                        <h1 className="custom-title">C-DAC Mohali</h1>
                        <h2 className="custom-subtitle">Explore Industry-Oriented Programmes and Innovation</h2>
                        <div className="custom-buttons">
                            <Link to="/contact" className="custom-button-contact" >Contact Us</Link>
                            <Link to="/adminPanel" className="custom-button-admin"> Access Admin Panel</Link>
                        </div>
                    </div>
                </div >
            </div >

            <div id="process" className="pd gr ">
                <div className="container">
                    <h1 className="hd text-center col-lg-6 col-md-10 mx-auto" data-aos="fade-up"> Come for Visit To See Our Facilities</h1>
                    <div className="row mt-5">
                        <div className="col-lg-3 col-6" data-aos="zoom-out-left" data-aos-delay="100">
                            <div className="effect rounded">
                                <img src="/assets/images/p1.jpeg" className="rounded img-fluid" />
                                <div className="eff rounded">
                                    <h4>Advanced Tools</h4>
                                    <div className="points">
                                        <ul >
                                            <li>Cadence</li>
                                            <li>Synopsys</li>
                                            <li>Vivado</li>
                                            <li>Siemens Tanner</li>
                                            <li>Mentor Graphics</li>
                                            <li>TCAD</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="fa fa-plus"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6 " data-aos="zoom-out-down" data-aos-delay="100" >
                            <div className="effect rounded">
                                <img src="/assets/images/p2.jpeg" className="rounded img-fluid" />
                                <div className="eff rounded">
                                    <h4>Modern Library</h4>
                                    <div className="points">
                                        <ul >
                                            <li>Technical books</li>
                                            <li>IEEE Xplore Digital Library</li>
                                            <li>Academic Journals for Research</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="fa fa-plus"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6 mt-lg-0 mt-5" data-aos="zoom-out-right" data-aos-delay="100">
                            <div className="effect rounded">
                                <img src="/assets/images/p3.jpeg" className="rounded img-fluid " />
                                <div className="eff rounded">
                                    <h4>Labs</h4>
                                    <div className="points">
                                        <ul>
                                            <li>VLSI Design Lab</li>
                                            <li>AI Computing Lab</li>
                                            <li>Embedded Systems</li>
                                            <li>Robotics Lab</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="fa fa-plus"></span>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6  mt-lg-0 mt-5" data-aos="zoom-out-up" data-aos-delay="100">
                            <div className="effect rounded">
                                <img src="/assets/images/p4.jpeg" className="rounded img-fluid" />
                                <div className="eff rounded">
                                    <h4>Hardware Kits</h4>
                                    <div className="points">
                                        <ul >
                                            <li>Raspberry Pi</li>
                                            <li>Arduino</li>
                                            <li>STM32</li>
                                            <li>Spartan</li>
                                            <li>Nvidia Jetson Nano</li>
                                            <li>FPGA boards</li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="fa fa-plus"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="solution" className="pd " >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12" data-aos="flip-up" data-aos-delay="500">
                            <h1 className="hd">Advancing Technology Through Innovation, Research and Professional Education</h1>
                            <ul className="nav nav-pills mb-4 mt-4 nav-fill" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">What we do</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Our Mission</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Social impact</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                    <h3> Delivering advanced computing education, research, innovation and
                                        industry-oriented technology solutions.</h3>

                                    <p className="para">C-DAC Mohali provides high-quality education, research, software development, technology innovation, and professional training in advanced computing for students and industry.</p>

                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span>Industry-Oriented PG Degree Programmes</li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                                    <h3>
                                        To empower future professionals through quality education,
                                        innovation and technological excellence.
                                    </h3>

                                    <p className="para">
                                        C-DAC Mohali aims to develop highly skilled professionals,
                                        promote cutting-edge research, encourage innovation, and
                                        strengthen India's digital ecosystem through advanced
                                        technology education.
                                    </p>

                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span>Excellence in Advanced Computing</li>
                                        <li><span className="fa fa-check"></span>Industry Collaboration & Innovation</li>
                                    </ul>
                                </div>

                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                                    <h3>
                                        Transforming education and technology through research,
                                        innovation and skilled workforce development.
                                    </h3>

                                    <p className="para">
                                        Through modern laboratories, experienced faculty,
                                        collaborative research, and industry partnerships,
                                        C-DAC Mohali continues to prepare technology professionals
                                        for global opportunities and digital transformation.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span> National Research & Development Initiatives</li>
                                        <li><span className="fa fa-check"></span>  Skilled Professionals for Emerging Technologies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12 ps-3 mt-lg-0 mt-5" data-aos="flip-down" data-aos-delay="500">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            What programmes are offered at C-DAC Mohali?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p> C-DAC Mohali offers industry-oriented Post Graduate Diploma programmes,
                                                specialized training, and certification courses in Artificial Intelligence,
                                                Cyber Security, Big Data Analytics, Embedded Systems, High Performance
                                                Computing, and Software Development to prepare students for successful
                                                careers in the rapidly evolving technology industry.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Why should students choose C-DAC Mohali?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p> C-DAC Mohali combines experienced faculty, modern laboratories,
                                                project-based learning, industry collaboration, and nationally
                                                recognized diploma programmes. Students gain practical knowledge,
                                                technical expertise, and valuable exposure to emerging technologies
                                                that enhance their career opportunities.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How does C-DAC Mohali support student learning?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p> The institute provides hands-on laboratory sessions, real-world
                                                industry projects, expert mentoring, research opportunities,
                                                workshops, seminars, and continuous technical guidance to help
                                                students develop practical skills and excel in today's competitive
                                                technology landscape.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            What facilities are available at C-DAC Mohali?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p> C-DAC Mohali provides state-of-the-art computer laboratories,
                                                modern classrooms, advanced research facilities, digital learning
                                                resources, experienced faculty, and collaborative project
                                                environments that support innovation, practical learning, and
                                                professional skill development across emerging technology domains.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                            Does C-DAC Mohali provide placement assistance?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p> Yes, C-DAC Mohali offers dedicated placement support through
                                                campus recruitment drives, industry interaction sessions,
                                                technical workshops, career guidance, interview preparation,
                                                and strong partnerships with leading IT organizations to help
                                                students build successful professional careers.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="products" className="pd gr ">
                <div className="container">
                    <h1 className="hd text-center col-lg-5 col-md-10 mx-auto " data-aos="fade-down">Why Students Trust Us.</h1>
                    <div className="row pt-5">
                        <div className="col-lg-4 col-md-6 col-12" data-aos="slide-left" data-aos-delay="100" >
                            <div className="pro rounded pr1 ">
                                <span className="fa-solid fa-graduation-cap" aria-hidden="true"></span>
                                <h3>1000+</h3>
                                <p className="para">Graduates since 2005 in Embedded Systems , VLSI Designs , AI.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mt-md-0 mt-5 " data-aos="slide-up" data-aos-delay="100">
                            <div className="pro rounded pr2 ">
                                <span className="fa fa-wrench icon-fea" aria-hidden="true"></span>
                                <h3>Deep Expertise</h3>
                                <p className="para">Hands on Practical Approach and Industry Exposure.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mt-lg-0 mt-5 mx-auto " data-aos="slide-right" data-aos-delay="100">
                            <div className="pro rounded pr3 ">
                                <span className="fa fa-flask" aria-hidden="true"></span>
                                <h3>Placement</h3>
                                <p className="para">Strong placement assistance with top companies in the industry.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="join" className="pd ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12" data-aos="zoom-in" data-aos-delay="500">
                            <h1 className="hd"> Begin Your Journey Towards Innovation with C-DAC Mohali</h1>
                            <p className="para">Expert-led training designed to prepare students and
                                professionals for successful careers in emerging technologies.</p>
                        </div>
                        <div className="col-lg-6 col-12 text-lg-end mt-lg-5 mt-2" data-aos="zoom-in" data-aos-delay="800">
                            <Link to="/overview" className="btn btn-primary-custom me-2">
                                Learn More
                            </Link>

                            <Link to="/contact" className="btn btn-outline-custom">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Owlcrousel />
            <Footer />

        </div >
    )
}

export default AdminHome
