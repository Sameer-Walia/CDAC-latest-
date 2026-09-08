import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import "../../AboutUs/AboutUs.css";
import { useEffect, useState } from "react";

function ITEC()
{

    useEffect(() =>
    {
        document.title = "Gallery";
    }, []);

    const campusImages = [
        "/assets/images/lab5.jpeg",
        "/assets/images/lab6.jpeg",
        "/assets/images/lab7.jpeg",
        "/assets/images/lab8.jpeg",
        "/assets/images/lab9.jpeg",
        "/assets/images/lab10.jpeg",
        "/assets/images/lab11.jpeg",
        "/assets/images/lab12.jpeg",
    ];

    const [currentIndex, setCurrentIndex] = useState(null);

    const openImage = (index) =>
    {
        setCurrentIndex(index);
    };

    const closeImage = () =>
    {
        setCurrentIndex(null);
    };

    const nextImage = (e) =>
    {
        e.stopPropagation();
        setCurrentIndex(
            currentIndex === campusImages.length - 1
                ? 0
                : currentIndex + 1
        );
    };

    const prevImage = (e) =>
    {
        e.stopPropagation();
        setCurrentIndex(
            currentIndex === 0
                ? campusImages.length - 1
                : currentIndex - 1
        );
    };

    return (
        <div>
            <div id="about_page" className="p-4">

                <div className="container">
                    <div className="breadcrumb">
                        <Link to="/" className="crumb">Home</Link>
                        <span className="separator">›</span>
                        <span className="crumb">About Us</span>
                        <span className="separator">›</span>
                        <span className="crumb active">Gallery</span>
                    </div>
                </div>

                <div className="container divide py-3">

                    <div className="content">

                        <h1 className="title hd">ITEC Courses</h1>

                        <div className="gallery-stats">
                            Total Images: {campusImages.length}
                        </div>

                        <div className="gallery-container">
                            {
                                campusImages.map((img, index) => (
                                    <div className="gallery-card" key={index} onClick={() => openImage(index)} >
                                        <img src={img} alt={`Campus ${index + 1}`} loading="lazy" />
                                        <div className="imgoverlay"><span>Campus View {index + 1}</span></div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Gallery</h3>
                        <ul>
                            <li ><Link to="/gallery">Campus</Link></li>
                            <li className="active"> <Link to="/itec_course">ITEC course</Link></li>
                            <li> <Link to="/labs">Labs</Link></li>
                            <li> <Link to="/student_counselling">Students Counselling </Link> </li>
                        </ul>
                    </div>
                </div>

                {
                    currentIndex !== null &&
                    <div className="lightbox" onClick={closeImage}>
                        <button className="nav-btn imgleft" onClick={prevImage}>❮</button>

                        <img src={campusImages[currentIndex]} alt="Preview" className="lightbox-image" onClick={(e) => e.stopPropagation()} />

                        <button className="nav-btn imgright" onClick={nextImage}>❯</button>

                        <button className="imgclose-btn" onClick={closeImage}> ✕ </button>

                        <div className="image-counter">{currentIndex + 1} / {campusImages.length}</div>
                    </div>

                }

            </div>

            <Footer />
        </div>
    );
}

export default ITEC;