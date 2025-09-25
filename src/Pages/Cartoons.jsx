import React, { useEffect, useState } from "react";
import Sidebar from "../hooks/cargallery/Sidebar";
import Modal from "../ui/Modal";
import Overlay from "../ui/Overlay";
import SearchBar from "../ui/SearchBar";
import Slider from "react-slick"; // Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Filter from "../ui/Filter";

const Cartoons = () => {
  const [images, setImages] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [category, setCategory] = useState("Cartoons");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchImage, setFetchImage] = useState([]);
  const [filters, setFilters] = useState({});

  // ✅ Keys
  const FANART_API_KEY = "bc339b6987e35c2743445e90a29fc034";
  const PIXABAY_API_KEY = "52317977-b9297d2de2506c0e93c32e187";

  // ✅ Cartoon source map (Fanart IDs where available)
  const cartoonSources = {
    "Ben 10": { type: "fanart", id: "72885" },
    "Naruto": { type: "fanart", id: "78857" },
    "Pokemon": { type: "fanart", id: "76703" },
    "Dragon Ball Z": { type: "fanart", id: "81356" },
    "Tom and Jerry": { type: "pixabay" },
    "Shinchan": { type: "pixabay" },
    "Doraemon": { type: "pixabay" },
    "Scooby Doo": { type: "pixabay" },
    "Powerpuff Girls": { type: "pixabay" },
    "Teen Titans": { type: "pixabay" },
    "Adventure Time": { type: "pixabay" },
    "Regular Show": { type: "pixabay" },
    "SpongeBob SquarePants": { type: "pixabay" },
    "Mickey Mouse": { type: "pixabay" },
    "Donald Duck": { type: "pixabay" },
    "DuckTales": { type: "pixabay" },
    "Phineas and Ferb": { type: "pixabay" },
    "Gravity Falls": { type: "pixabay" },
    "Looney Tunes": { type: "pixabay" },
    "Oggy and the Cockroaches": { type: "pixabay" },
  };

  // ✅ Cartoon buttons
  const topics = Object.keys(cartoonSources);

  // ✅ Fetch images (Hybrid logic)
  const fetchImages = async (query, pageNum, reset = false) => {
    setLoading(true);
    try {
      const source = cartoonSources[query] || { type: "pixabay" };
      let results = [];

      if (source.type === "fanart") {
        // Fanart API
        const res = await fetch(
          `https://webservice.fanart.tv/v3/tv/${source.id}?api_key=${FANART_API_KEY}`
        );
        const data = await res.json();

        // ✅ Fanart me "showbackground" ya "tvthumb" hota hai
        if (data.showbackground) {
          results = data.showbackground.map((item, i) => ({
            id: i,
            url: item.url,
            tags: query,
          }));
        } else if (data.tvthumb) {
          results = data.tvthumb.map((item, i) => ({
            id: i,
            url: item.url,
            tags: query,
          }));
        }
      } else {
        // Pixabay API
        const res = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
            query
          )}&per_page=45&page=${pageNum}&image_type=illustration`
        );
        const data = await res.json();
        results = data.hits.map((img) => ({
          id: img.id,
          url: img.webformatURL,
          tags: img.tags,
        }));
      }

      if (reset) {
        setImages(results);
      } else {
        setImages((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  // ✅ Load More
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(category, nextPage);
  };

  // ✅ First load
  useEffect(() => {
    fetchImages(category, 1, true);
  }, [category]);

  // ✅ Carousel (Pixabay se cartoons mix)
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=cartoons&per_page=25&image_type=illustration`
        );
        const data = await res.json();
        setFetchImage(data.hits);
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

  return (
    <>
      <Sidebar />
      <SearchBar
        placeholder="Search Cartoons..."
        onSearch={(q) => {
          setCategory(q);
          setPage(1);
          fetchImages(q, 1, true);
        }}
      />

      <div className="w-full min-h-screen bg-gray-50 -mt-10 pl-25 pr-10">
        {/* ✅ Filter */}
      
        {/* Heading */}
        <h1 className="text-8xl text-center pt-40 font-bold text-gray-800">
          Cartoons Gallery
        </h1>
        <p className="pb-8 text-lg text-center mb-5 text-gray-600">
          Explore your favorite cartoon wallpapers & fan arts
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
              className={`px-5 py-2 rounded-sm font-medium transition ${
                category === topic
                  ? " text-gray-500"
                  : " hover:text-gray-300"
              }`}
            >
              {topic}
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

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-lg group relative "
              onClick={() => setSelectedPhoto(img)}
            >
              <img
                src={img.url}
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
          {images.length >= 20 && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 mb-10 bg-black text-white rounded-lg shadow hover:bg-red-900 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Cartoons;
