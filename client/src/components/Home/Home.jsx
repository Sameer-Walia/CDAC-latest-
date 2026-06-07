import { Link } from "react-router-dom";
import Typewriter from "../Typewriter";
import "./Home.css";
import { useEffect } from "react";
import Owlcrousel from "../OwlCrousel";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import Footer from "../Footer/Footer";
import MarqueeModule from "react-fast-marquee";
const Marquee = MarqueeModule.default;


function Home()
{
    useEffect(() =>
    {
        document.title = "Home Page"
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
                        <a href="https://www.indiatv.in/" target="_blank" rel="noopener noreferrer">
                            📊 Welcome to the Feedback Portal for Educational Institutions!
                        </a>
                    </div>

                    <span style={{ margin: "0 40px" }} />

                    <a href="/teacher-feedback">
                        💡 Empowering Teachers Through Actionable Feedback!
                    </a>

                    <span style={{ margin: "0 40px" }} />

                    <a href="/performance-reports">
                        📋 Analyze Teacher Performance with In-Depth Feedback Reports!
                    </a>

                    <span style={{ margin: "0 40px" }} />

                    <div className="me-5">
                        <a href="/real-time-analysis" >
                            ⏱️ Real-Time Feedback Analysis for Continuous Improvement!
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
                            <p className="para my-5 text-black">
                                "Empowering education with student feedback. Analyze and improve teacher performance to enhance learning experiences."
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
                            <h1 className=" mt-4 hd">Best IT Solution Service From Experienced Engineer.</h1>

                            <p className="para my-4">Lorem ipsum viverra feugiat. Pellen tesque libero ut justo, sed ultrices in ligula. Semper at tempufddfel. Lorem ipsum dolor sit amet elit. Non quae, fugiat nihil ad.</p>

                            <p className="para mb-4" >Pellen tesque libero ut justo, ultrices in ligula. Semper at. Lorem init ipsum dolor sit amet elit. Dolor ipsum non velit, culpa! Pellen tesque libero ut justo, ultrices in ligula amet dolor sit init dolor sit, amet elit. Dolor ipsum non velit, culpa! elit ut et.</p>

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
                        <h1 className="custom-title">Write Your Feedback Now!</h1>
                        <h2 className="custom-subtitle">Empowering Teachers Through Actionable Feedback!</h2>
                        <div className="custom-buttons">
                            <Link to="" className="custom-button-start" >Get started now</Link>
                            <Link to="/contact" className="custom-button-contact" >Contact Us</Link>
                            <Link to="/staff_login" className="custom-button-admin"> Access Panel</Link>
                        </div>
                    </div>
                </div >
            </div >

            <div id="process" className="pd gr ">
                <div className="container">
                    <h1 className="hd text-center col-lg-6 col-md-10 mx-auto" data-aos="fade-up">Come for Visit to See our Work Process</h1>
                    <div className="row mt-5">
                        <div className="col-lg-3 col-6" data-aos="zoom-out-left" data-aos-delay="100">
                            <div className="effect rounded">
                                <img src="/assets/images/p1.png" className="rounded img-fluid" />
                                <div className="eff rounded">
                                    <h4>Dedicated IT Solution</h4>
                                    <p className="para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quas officiis!</p>
                                </div>
                                <span className="fa fa-plus"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6 " data-aos="zoom-out-down" data-aos-delay="100" >
                            <div className="effect rounded">
                                <img src="/assets/images/p2.jpeg" className="rounded img-fluid" />
                                <div className="eff rounded">
                                    <h4>Dedicated IT Solution</h4>
                                    <p className="para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quas officiis!</p>
                                </div>
                                <span className="fa fa-plus"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6 mt-lg-0 mt-5" data-aos="zoom-out-right" data-aos-delay="100">
                            <div className="effect rounded">
                                <img src="/assets/images/p3.jpeg" className="rounded img-fluid" />
                                <div className="eff rounded">
                                    <h4>Dedicated IT Solution</h4>
                                    <p className="para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quas officiis!</p>
                                </div>
                                <span className="fa fa-plus"></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6  mt-lg-0 mt-5" data-aos="zoom-out-up" data-aos-delay="100">
                            <div className="effect rounded">
                                <img src="/assets/images/p4.png" className="rounded img-fluid" />
                                <div className="eff rounded">
                                    <h4>Dedicated IT Solution</h4>
                                    <p className="para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quas officiis!</p>
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
                            <h1 className="hd">Need a Better Work? We are here to IT Solution with 30 years of experience</h1>
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
                                    <h3>To believe that the smart looking website is the first impression all over.</h3>
                                    <p className="para">This Our History to a tendency to believe that the smart looking website is the first impression. Lorem dolor sit amet, elit!</p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span>Leading private equity firms</li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                                    <h3>This Our History to a tendency to believe that the smart looking website is the first impression.</h3>
                                    <p className="para">Lorem ipsum dolor sit amet, elit. Id ab commodi impedit magnam sint voluptates. Minima velit expedita maiores, sit at in!</p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span>Helping Nonprofit organizations</li>
                                        <li><span className="fa fa-check"></span>   Leading private equity firms</li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                                    <h3>This Our History to a tendency to believe thes that smart looking website is the first impression.</h3>
                                    <p className="para"> Lorem ipsum dolor sit amet, elit. Id ab commodi impedit magnam sint voluptates. Minima velit expedita maiores, sit at in!!</p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check"></span> Always Fast and friendly support</li>
                                        <li><span className="fa fa-check"></span> Experienced Professional Team</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12 ps-3 mt-lg-0 mt-5" data-aos="flip-down" data-aos-delay="500">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            How much does a static website cost?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How to choose a best web template?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How to download a template?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            Why should i choose a free website?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                            Why should i choose a free website?
                                            <span className="plus"><i className="fa-solid fa-circle-plus"></i></span>
                                            <span className="minus"><i className="fa-solid fa-circle-minus"></i></span>
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit eos vero quis quas eius distinctio nostrum voluptas numquam? Dolores dolor magni obcaecati iusto tempora esse rem at repellat vero beatae!</p>
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
                    <h1 className="hd text-center col-lg-5 col-md-10 mx-auto " data-aos="fade-down">To design and deliver the innovative products.</h1>
                    <div className="row pt-5">
                        <div className="col-lg-4 col-md-6 col-12" data-aos="slide-left" data-aos-delay="100" >
                            <div className="pro rounded pr1 ">
                                <span className="fa-regular fa-sun" aria-hidden="true"></span>
                                <h3>Augmented Reality</h3>
                                <p className="para">Lorem ipsum dolor sit amet elit et. Debitis nam, minima iste ipsum.</p>
                                <a href="">Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mt-md-0 mt-5 " data-aos="slide-up" data-aos-delay="100">
                            <div className="pro rounded pr2 ">
                                <span className="fa fa-wrench icon-fea" aria-hidden="true"></span>
                                <h3>Deep Expertise</h3>
                                <p className="para">Lorem ipsum dolor sit amet elit et. Debitis nam, minima iste ipsum.</p>
                                <a href="">Read More</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mt-lg-0 mt-5 mx-auto " data-aos="slide-right" data-aos-delay="100">
                            <div className="pro rounded pr3 ">
                                <span className="fa fa-flask" aria-hidden="true"></span>
                                <h3>Software development</h3>
                                <p className="para">Lorem ipsum dolor sit amet elit et. Debitis nam, minima iste ipsum.</p>
                                <a href="">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="join" className="pd ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12" data-aos="zoom-in" data-aos-delay="500">
                            <h1 className="hd">Start improving your Business today! Join Us</h1>
                            <p className="para">Lorem ipsum dolor sit amet elit. Velit beatae rem ullam dolore nisi esse quasi. Integer sit amet. Lorem ipsum dolor sit amet elit.</p>
                        </div>
                        <div className="col-lg-6 col-12 text-lg-end mt-lg-5 mt-2" data-aos="zoom-in" data-aos-delay="800">
                            <Link to="/about" className="btn btn-primary-custom me-2">
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

export default Home
