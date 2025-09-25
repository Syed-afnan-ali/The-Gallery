import React, { useEffect, useState } from "react";
import Sidebar from "../hooks/cargallery/Sidebar";
import Modal from "../ui/Modal";
import Overlay from "../ui/overlay";
import SearchBar from "../ui/SearchBar";
import Slider from "react-slick"; // Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Filter from "../ui/Filter";

const Cities = () => {
    const [images, setImages] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [category, setCategory] = useState("Cities");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetchImage, setfetchImage] = useState([]);
    const [filters, setFilters] = useState({}); // ✅ filters store karne ke liye

    const API_KEY = "52317977-b9297d2de2506c0e93c32e187";

    useEffect(() => {
        fetchImages(category, 1, true);
    }, [category, filters]); // ✅ filters change hone par dobara fetch

    const fetchImages = async (query, pageNum, reset = false) => {
        setLoading(true);
        try {

            const { orientation, colors, image_size, image_type, category } = filters;

            let url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&category=${category}&per_page=35&page=${pageNum}`;


            if (orientation) url += `&orientation=${orientation}`;
            if (colors) url += `&colors=${colors}`;
            if (image_size) url += `&image_size=${image_size}`;
            if (image_type) url += `&image_type=${image_type}`;
            if (category) url += `&category=${category}`;


            const res = await fetch(url);
            const data = await res.json();
            if (reset) {
                setImages(data.hits);
            } else {
                setImages((prev) => [...prev, ...data.hits]);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
        setLoading(false);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchImages(category, nextPage);
    };

    useEffect(() => {
        const fetchCarouselImages = async () => {
            try {
                const res = await fetch(
                    `https://pixabay.com/api/?key=${API_KEY}&q=Cities&image_type=photo&per_page=25`
                );
                const data = await res.json();
                setfetchImage(data.hits);
            } catch (err) {
                console.error("Carousel fetch error:", err);
            }
        };

        fetchCarouselImages();
    }, []);

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 30000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        swipe: false,
        draggable: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    const handleDownload = (url, filename) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename || "image.jpg";
        link.click();
    };

   const topics = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Dubai",
  "Istanbul",
  "Karachi",
  "Lahore",
  "Rome",
  "Sydney",
  "Berlin",
  "Toronto",
  "Bangkok",
 
];




    return (
        <>
            <Sidebar />
            <SearchBar
                placeholder="Search Cities & nature..."
                onSearch={(q) => {
                    setCategory(q);
                    setPage(1);
                    fetchImages(q, 1, true);
                }}
            />

            <div className="w-full min-h-screen bg-gray-50 -mt-10 pl-25 pr-10">
                {/* ✅ Filter integrated */}
                <Filter
                    onFilterChange={(type, value) => {
                        setFilters((prev) => ({
                            ...prev,
                            [type]: value,
                        }));
                        setPage(1);
                        fetchImages(category, 1, true); // 👈 filter apply hote hi reload
                    }}
                />


                {/* Heading */}
                <h1 className="text-6xl text-center pt-15 font-bold text-gray-800">
                    Cities Gallery
                </h1>
                <p className="pb-8 text-lg text-center mb-5 text-gray-600">
                    Find your perfect Cities image. Free pictures to download and use in
                    your next project.
                </p>


                {/* Category Buttons */}
                <div className="flex flex-wrap  mb-8">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => {
                                setCategory(topic);
                                setPage(1);
                            }}
                            className={`px-5 py-2 rounded-sm font-medium transition ${category === topic ? " text-gray-500" : " hover:text-gray-300"
                                }`}
                        >
                            {topic.charAt(0).toUpperCase() + topic.slice(1)}
                        </button>
                    ))}
                </div>


                {/* Carousel */}
                <Slider {...carouselSettings} className="mb-12">
                    {fetchImage.map((img) => (
                        <div key={img.id} className="px-2">
                            <img
                                src={img.webformatURL}
                                alt={img.tags}
                                className="rounded-xl shadow-lg w-full object-cover h-64 hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </Slider>

                {/* Masonry Image Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-lg group relative "
                            onClick={() => setSelectedPhoto(img)}
                        >
                            <img
                                src={img.webformatURL}
                                alt={img.tags}
                                className="w-full h-auto object-cover rounded-xl"
                            />
                            <Overlay img={img} />
                        </div>
                    ))}
                </div>

                {/* Modal */}
                <Modal
                    selectedPhoto={selectedPhoto}
                    setSelectedPhoto={setSelectedPhoto}
                    handleDownload={handleDownload}
                />

                {/* Load More Button */}
                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="px-6 py-3 mb-10 bg-black text-white rounded-lg shadow hover:bg-red-900 transition disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cities;
