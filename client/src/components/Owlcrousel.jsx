import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Owlcrousel()
{
    const data = [
        {
            id: 1,
            title: "Industry Standard Tools",
            img: "/assets/images/p1.jpeg",
            description: "Access industry-standard software, development platforms, programming tools, and professional technologies used for practical learning, research, and innovation."
        },
        {
            id: 2,
            title: "Modern Library",
            img: "/assets/images/p2.jpeg",
            description: "A well-equipped library offering technical books, journals, e-resources, and research materials to support academic excellence."
        },
        {
            id: 3,
            title: "Advanced Computing Labs",
            img: "/assets/images/p3.jpeg",
            description: "Modern laboratories equipped with high-performance systems for practical learning, research, and software development."
        },
        {
            id: 4,
            title: "Hardware Development Kits",
            img: "/assets/images/p4.jpeg",
            description: "Hands-on experience with embedded systems, IoT devices, FPGA boards, and hardware development platforms."
        },
        {
            id: 5,
            title: "Artificial Intelligence",
            img: "/assets/images/AI.jpg",
            description: "Specialized education and research in Artificial Intelligence, Machine Learning, and Data Science using modern technologies."
        },
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
                                        {item.description}
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
                                        {item.description}
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