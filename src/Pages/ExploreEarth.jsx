import React, { useEffect, useState } from "react";
import Overlay from "../ui/overlay";
import Sidebar from "../hooks/cargallery/Sidebar";
import Masonry from "react-masonry-css";
import Modal from "../ui/Modal";

const PIXABAY_KEY = "52317977-b9297d2de2506c0e93c32e187";

const randomWords = [
  "Nature", "Travel", "Mountains", "Ocean", "Forest",
  "Desert", "Sunset", "Wildlife", "Adventure", "Landscape"
];

const ExploreEarth = () => {
  const [background, setBackground] = useState("");
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentQuery, setCurrentQuery] = useState("random");
  const [searchInput, setSearchInput] = useState(""); // 🔹 for search bar

  // ✅ Hero Section Random Earth Image
  const fetchHeroImage = async () => {
    try {
      const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=earth&image_type=photo&orientation=horizontal&per_page=50`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.hits && data.hits.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        setBackground(data.hits[randomIndex].largeImageURL);
      }
    } catch (err) {
      console.error("Error fetching hero image:", err);
    }
  };

  // ✅ Gallery Fetch Function
  const fetchGallery = async (query = currentQuery, pageNum = 1) => {
    setLoading(true);
    try {
      const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&per_page=40&page=${pageNum}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.hits) {
        if (pageNum === 1) {
          setGallery(data.hits);
        } else {
          setGallery((prev) => [...prev, ...data.hits]);
        }
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImage();
    fetchGallery();
  }, []);

  // ✅ Load More
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGallery(currentQuery, nextPage);
  };

  // ✅ Random Word Click Handler
  const handleWordClick = (word) => {
    setCurrentQuery(word);
    setPage(1);
    fetchGallery(word, 1);
  };

  // ✅ Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setCurrentQuery(searchInput);
    setPage(1);
    fetchGallery(searchInput, 1);
  };

  // ✅ Simple download function
  const handleDownload = (url, filename = "download.jpg") => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Sidebar />
      <div className="w-full">

        {/* 🔹 Hero Section */}
        <div
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">Explore The Earth</h1>

            {/* 🔹 Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search photos..."
                className="flex-grow px-4 py-2 text-gray-800 outline-none"
              />
              <button
                type="submit"
                className="px-5 bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                Search
              </button>
            </form>

            {/* 🔹 Random Words */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {randomWords.map((word) => (
                <button
                  key={word}
                  onClick={() => handleWordClick(word)}
                  className="text-white hover:text-red-900 px-3 py-1 transition font-medium"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 Gallery Section (Masonry Layout) */}
        <div className="pl-25 py-10 pr-10">
          <Masonry
            breakpointCols={{ default: 4, 1024: 3, 768: 2, 640: 1 }}
            className="flex gap-6"
            columnClassName="masonry-column"
          >
            {gallery.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-xl overflow-hidden shadow-lg  mb-6"
                onClick={() => setSelectedPhoto(img)}
              >
                <img
                  src={img.webformatURL}
                  alt={img.tags}
                  className="w-full object-cover"
                />
                <Overlay img={img} />
              </div>
            ))}
          </Masonry>
        </div>

        {/* 🔹 Load More Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>

        {/* 🔹 Modal */}
        {selectedPhoto && (
          <Modal
            selectedPhoto={selectedPhoto}
            setSelectedPhoto={setSelectedPhoto}
            handleDownload={handleDownload}
            brand={currentQuery} // Optional: brand name for download
          />
        )}
      </div>
    </>
  );
};

export default ExploreEarth;
