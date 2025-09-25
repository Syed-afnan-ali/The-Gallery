import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Slider from "react-slick"; // Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NatureGallery from "../hooks/naturegallery/NatureGallery";
import BrandsCarousel from "../hooks/naturegallery/BrandsCarousel";
import Sidebar from "../hooks/cargallery/Sidebar";
import { Link } from "react-router-dom";

const PIXABAY_KEY = "52317977-b9297d2de2506c0e93c32e187";

const About = () => {
    const [teamImages, setTeamImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);

    // Fetch team/car images from Pixabay
    const fetchTeamImages = async () => {
        try {
            const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=cars&image_type=photo&per_page=10`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.hits) setTeamImages(data.hits);
        } catch (err) {
            console.error("Error fetching team images:", err);
        }
    };

    // Fetch gallery images (nature or random)
    const fetchGalleryImages = async () => {
        try {
            const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=nature&image_type=photo&per_page=12`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.hits) setGalleryImages(data.hits);
        } catch (err) {
            console.error("Error fetching gallery images:", err);
        }
    };

    useEffect(() => {
        fetchTeamImages();
        fetchGalleryImages();
    }, []);

    // Carousel settings with auto-play
    const carouselSettings = {
        dots: false,           // optional, smoother without dots
        infinite: true,
        speed: 30000,           // total time to scroll all slides
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,       // no pause between slides
        cssEase: "linear",      // smooth continuous scroll
        swipe: false,           // optional, disable manual swipe
        draggable: false,       // optional
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };


    return (
        <>
            <Sidebar />
            <div className="  ">

                {/* Hero Section */}
                <div className="relative mt-15 w-full h-96 mb-12">
                    <img
                        src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1350&q=80"
                        alt="About Hero"
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                            About Us
                        </h1>
                    </div>
                </div>

                {/* About Text */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <p className="text-gray-700 text-lg md:text-xl">
                        Welcome to our car enthusiasts community! We bring together the best
                        of automotive innovation, photography, and passion. Explore our
                        collection of stunning car images and nature-inspired visuals.
                    </p>
                </div>

                {/* Team / Cars Carousel */}
                <h2 className="text-3xl font-bold text-center mb-6">Our Cars</h2>
                <Slider {...carouselSettings} className="mb-12">
                    {teamImages.map((img) => (
                        <div key={img.id} className="px-2">
                            <img
                                src={img.webformatURL}
                                alt={img.tags}
                                className="rounded-xl shadow-lg w-full object-cover h-64 hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <NatureGallery />
            <div className="w-full px-6 md:px-16 py-12 bg-white">
                {/* Section Heading */}
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    About The Gallery
                </h2>

                {/* Company Info */}
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    {/* Text */}
                    <div className="flex-1 text-gray-700">
                        <p className="text-lg mb-4">
                            Welcome to <span className="font-semibold">The Gallery</span> – your ultimate
                            destination for stunning car photography and curated nature visuals.
                        </p>
                        <p className="text-lg mb-4">
                            Founded by Syed Afnan Ali, our website brings together enthusiasts,
                            photographers, and car lovers from around the globe. Explore our
                            galleries, discover inspiration, and connect with a community that
                            shares your passion.
                        </p>
                        <p className="text-lg mb-4">
                            We believe in showcasing high-quality images, unique perspectives,
                            and the beauty of both automotive and natural landscapes.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Contact Us</h3>
                            <p>Email: <a href="mailto:contact@thegallery.com" className="text-red-600 hover:underline">contact@thegallery.com</a></p>
                            <p>Phone: <a href="tel:+923001234567" className="text-red-600 hover:underline">+92 300 1234567</a></p>
                            <p>Website: <a href="https://www.thegallery.com" className="text-red-600 hover:underline">www.thegallery.com</a></p>
                        </div>
                    </div>

                    {/* Image / Visual */}

                </div>
            </div>
            <BrandsCarousel />

            {/* Mission & Vision Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">

                {/* Mission Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <div className="bg-red-600 text-white w-16 h-16 flex items-center justify-center rounded-full mb-4">
                        {/* Mission Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4h10zm0 0v6H7v-6h10z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                    <p className="text-gray-600 text-lg">
                        At <span className="font-semibold">Gallery</span>, our mission is to unite car enthusiasts worldwide by showcasing the beauty, performance, and innovation of automobiles through high-quality images and videos.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white  rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <div className="bg-red-600 text-white w-16 h-16 flex items-center justify-center rounded-full mb-4">
                        {/* Vision Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
                    <p className="text-gray-600 text-lg">
                        We envision a global community where automotive passion meets creativity. Our goal is to inspire, educate, and connect car lovers through curated galleries and immersive carousels.
                    </p>
                </div>

            </div>
            <div
                className="w-full h-screen bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/madewith-banner.avif')",
                }}
            ></div>


            <div className="w-full h-screen relative  flex items-center justify-center px-6 md:px-16">

                {/* Left Image */}
                <div className="absolute left-16 top-0 h-full w-1/3 overflow-hidden">
                    <img
                        src="/images/photographers-left-img.avif"
                        alt="Left Photographer"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right Image */}
                <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden">
                    <img
                        src="/images/photographers-right-img.avif"
                        alt="Right Photographer"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Middle Content */}
                <div className="z-10 w-full md:w-1/3 text-center flex flex-col items-center justify-center px-4 space-y-6 text-black rounded-xl p-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-black">
                        Meet Our Photographers
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl">
                        Our passionate photographers capture the essence of automotive beauty. From classic cars to the latest innovations, every shot tells a story.
                    </p>
                    <Link
                        to="/Search"
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition inline-block"
                    >
                        Explore Gallery
                    </Link>
                </div>
            </div>




        </>
    );
};

export default About;
