import React, { useEffect, useState } from "react";
import Sidebar from "../hooks/cargallery/Sidebar";
import { DiVim } from "react-icons/di";
import { div } from "framer-motion/client";
import Overlay from "../ui/Overlay";

const VideoGallery = () => {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState("cars"); // default search
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const PIXABAY_KEY = "52317977-b9297d2de2506c0e93c32e187";

    // Fetch Videos Function
    const fetchVideos = async (newQuery = query, newPage = page) => {
        try {
            setLoading(true);

            const url = `https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=${encodeURIComponent(
                newQuery
            )}&per_page=30&page=${newPage}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.hits) {
                if (newPage === 1) {
                    setVideos(data.hits);
                } else {
                    setVideos((prev) => [...prev, ...data.hits]);
                }
            } else {
                setError("No videos found.");
            }
        } catch (err) {
            setError("Error fetching videos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(query, page);
    }, [query, page]);

    // Handle Search Submit
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchVideos(query, 1);
    };

    // Car Brand Logos
    const carBrands = [
        { name: "BMW", logo: "https://logo.clearbit.com/bmw.com" },
        { name: "Mercedes", logo: "https://logo.clearbit.com/mercedes-benz.com" },
        { name: "Audi", logo: "https://logo.clearbit.com/audi.com" },
        { name: "Toyota", logo: "https://logo.clearbit.com/toyota.com" },
        { name: "Honda", logo: "https://logo.clearbit.com/honda.com" },
        { name: "Ford", logo: "https://logo.clearbit.com/ford.com" },
        { name: "Ferrari", logo: "https://logo.clearbit.com/ferrari.com" },
        { name: "Lamborghini", logo: "https://logo.clearbit.com/lamborghini.com" },
        { name: "Porsche", logo: "https://logo.clearbit.com/porsche.com" },
        { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
        { name: "Nissan", logo: "https://logo.clearbit.com/nissan.com" },
        { name: "Jeep", logo: "https://logo.clearbit.com/jeep.com" },
        { name: "Rolls-Royce", logo: "https://logo.clearbit.com/rolls-roycemotorcars.com" },

    ];

    return (
        <>
            <Sidebar />
            <div className="pl-25 pr-10 mt-20">

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex justify-center mb-6 gap-2"
                >
                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border p-2 w-full rounded "
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-red-900"
                    >
                        Search
                    </button>
                </form>

                {/* Show Searched Word Below */}
                {query && (
                    <div className="flex justify-between">

                        <p className=" text-lg font-semibold mt-2">
                            Showing results for: <span className="text-red-600">{query}</span>

                        </p>
                        {/* Category Buttons */}
                        <div className="flex flex-wrap  gap-3 mb-6">
                            {["Sports", "Luxury", "Classic", "SUV", "Electric", "Racing", "Concept"].map(
                                (cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setQuery(cat + " cars");
                                            setPage(1);
                                        }}
                                        className="px-4 py-2  hover:text-gray-500 "
                                    >
                                        {cat}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                )}


                {/* Brand Logos */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {carBrands.map((brand) => (
                        <img
                            key={brand.name}
                            src={brand.logo}
                            alt={brand.name}
                            className="w-16 h-16  hover:scale-110 transition"
                            onClick={() => {
                                setQuery(brand.name + " car");
                                setPage(1);
                            }}
                        />
                    ))}
                </div>

                {/* Masonry Grid */}
                {loading && <p className="text-center text-blue-600">Loading...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}

                <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden break-inside-avoid transform hover:scale-[1.02] hover:shadow-2xl transition duration-300"
                        >
                            {/* 🔹 Video Player */}
                            <div className="relative">
                                <video
                                    controls
                                    muted
                                    playsInline
                                    className="w-full rounded-t-2xl object-cover"
                                    src={video.videos.medium.url}
                                    type="videos/mp4"
                                />

                                {/* Play Icon Overlay */}
                                {/* <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition duration-300">
          <span className="text-white text-4xl">▶</span>
        </div> */}
                            </div>

                            {/* 🔹 Video Info */}
                            <div className="p-4">
                                <p className="text-gray-800 font-semibold text-lg flex items-center gap-2">
                                    👤 {video.user}
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                    🏷️ {video.tags}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Load More Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-red-900"
                    >
                        Load More
                    </button>
                </div>
            </div>
        </>
    );
};

export default VideoGallery;
