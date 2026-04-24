import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Owlcrousel()
{
    const data = [
        { id: 1, title: "Web Development", img: "/assets/images/p1.png" },
        { id: 2, title: "UI/UX Design", img: "/assets/images/p2.jpeg" },
        { id: 3, title: "App Development", img: "/assets/images/p3.jpeg" },
        { id: 4, title: "Cloud Services", img: "/assets/images/p4.png" },
        { id: 5, title: "AI Solutions", img: "/assets/images/s1.jpg" },
        { id: 6, title: "Cyber Security", img: "/assets/images/s2.jpg" }
    ];

    return (
        <div className="gr pd">
            <div className="container ">

                <h2 className="text-center hd mb-5">
                    Our Services
                </h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        992: { slidesPerView: 3 },
                        576: { slidesPerView: 2 },
                        0: { slidesPerView: 1 }
                    }}
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className="custom-card"
                                data-bs-toggle="modal"
                                data-bs-target={`#modal${item.id}`}
                            >
                                {/* Image */}
                                <div className="custom-img-box">
                                    <img src={item.img} alt={item.title} />
                                </div>

                                {/* Content */}
                                <div className="custom-content">
                                    <h5>{item.title}</h5>
                                    <p>
                                        We provide high-quality {item.title.toLowerCase()} services
                                        to help your business grow faster and smarter.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {data.map((item) => (
                    <div key={item.id} className="modal fade" id={`modal${item.id}`}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded-3 p-3">

                                <div className="modal-header border-0">
                                    <h5>{item.title}</h5>
                                    <button className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <div className="modal-body text-center">
                                    <img
                                        src={item.img}
                                        className="img-fluid mb-3"
                                        style={{ maxHeight: "200px" }}
                                    />
                                    <p>
                                        Detailed information about {item.title}. We deliver
                                        top-notch solutions tailored to your needs.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Owlcrousel;