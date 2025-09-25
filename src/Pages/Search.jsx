import React, { useEffect, useState } from "react";
import Sidebar from "../hooks/cargallery/Sidebar";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";

const PIXABAY_KEY = "52317977-b9297d2de2506c0e93c32e187";

export default function Search() {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedImg, setSelectedImg] = useState(null); // 🔹 modal image

    // 🔹 Random background on reload
    useEffect(() => {
        const q = encodeURIComponent("car");

        fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${q}&image_type=photo&per_page=50`)
            .then((res) => res.json())
            .then((data) => {
                if (data.hits && data.hits.length > 0) {
                    const random = data.hits[Math.floor(Math.random() * data.hits.length)];
                    setBackground(random.largeImageURL);
                }
            })
            .catch((err) => console.error("Background error:", err));
    }, []);

    // 🔹 Download function
    const handleDownload = (url, filename = "download.jpg") => {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 🔹 Search Function
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setPage(1);
        try {
            const res = await fetch(
                `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=20&page=1`
            );
            const data = await res.json();
            setResults(data.hits || []);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Load More
    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setLoading(true);
        try {
            const res = await fetch(
                `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=20&page=${nextPage}`
            );
            const data = await res.json();
            setResults((prev) => [...prev, ...(data.hits || [])]);
            setPage(nextPage);
        } catch (error) {
            console.error("Load more error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="min-h-screen w-full">
                {/* 🔹 Fullscreen Background with Overlay */}
                <div
                    className="relative h-screen bg-cover bg-center"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* 🔹 Content on Hero Section */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                        <h1 className="text-4xl font-bold mb-6">Gallery Image Search</h1>

                        {/* 🔹 Bigger Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="flex w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg"
                        >
                            <input
                                type="text"
                                placeholder="Search photos..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 px-6 py-3 text-gray-800 outline-none text-lg"
                            />
                            <button
                                type="submit"
                                className="bg-red-500 px-8 py-3 text-white font-semibold hover:bg-red-600 transition text-lg"
                            >
                                Search
                            </button>
                        </form>

                        {/* 🔹 Buttons under search bar */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => setQuery("popular")}
                                className="px-5 py-2 text-white font-medium hover:text-red-500  transition"
                            >
                                Popular
                            </button>
                            <button
                                onClick={() => setQuery("latest")}
                                className="px-5 py-2 text-white font-medium hover:text-red-500  transition"
                            >
                                Latest
                            </button>
                            <button
                                onClick={() => setQuery("trending")}
                                className="px-5 py-2 text-white font-medium hover:text-red-500  transition"
                            >
                                Trending
                            </button>
                        </div>

                        <p className="mt-6 max-w-2xl text-gray-200 text-sm leading-relaxed">
                            Explore and download free <strong>HD stock photos</strong> from Pixabay. Discover millions of royalty-free images including <strong>nature</strong>, <strong>cars</strong>, <strong>travel</strong>, and <strong>business</strong> pictures.
                        </p>
                    </div>
                </div>

                {/* 🔹 Separate Section for Results */}
                <div className="py-5 pl-20">
                    <div className="max-w-6xl mx-auto">
                        {loading && <p className="text-gray-700 text-lg mb-6">Loading...</p>}

                        {results.length > 0 && (
                            <h2 className="text-2xl font-bold mb-8 text-gray-800">
                                Search Results for "{query}"
                            </h2>
                        )}

                        {/* Masonry Layout */}
                        <div className="columns-1 sm:columns-2 md:columns-4 gap-6">
                            {results.map((img) => (
                                <div
                                    key={img.id}
                                    className="mb-6 relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition break-inside-avoid "
                                    onClick={() => setSelectedImg(img)} // 🔹 modal
                                >
                                    <img
                                        src={img.webformatURL}
                                        alt={img.tags}
                                        className="w-full object-cover"
                                    />

                                    <Overlay img={img} />

                                    <div className="p-3">
                                        <p className="text-gray-700 font-medium">{img.user}</p>
                                        <p className="text-gray-500 text-sm">👁 {img.views}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {results.length > 0 && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    {loading ? "Loading..." : "Load More"}
                                </button>
                            </div>
                        )}

                        {!loading && results.length === 0 && query && (
                            <p className="text-gray-600 text-lg mt-8">
                                No results found for "{query}" 😕
                            </p>
                        )}
                    </div>
                </div>

                {/* 🔹 Modal Component */}
                <Modal
                    selectedPhoto={selectedImg}
                    setSelectedPhoto={setSelectedImg}
                    handleDownload={handleDownload}
                />
            </div>
        </>
    );
}
