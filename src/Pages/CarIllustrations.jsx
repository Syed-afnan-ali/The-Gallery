import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Sidebar from "../hooks/cargallery/Sidebar";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";
import Filter from "../ui/Filter";

const PIXABAY_KEY = "52317977-b9297d2de2506c0e93c32e187";

const CarIllustrations = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("car illustration colorful background");
  const [page, setPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
      const [filters, setFilters] = useState({}); // ✅ filters store karne ke liye
  

  const brands = [
    { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
    { name: "Audi", logo: "/images/audi.png" },
    { name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { name: "Lamborghini", logo: "/images/lambo.png" },
    { name: "Ferrari", logo: "/images/ferrary.png" },
    { name: "Porsche", logo: "/images/porsche.png" },
    { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" },
    { name: "Honda", logo: "/images/honda.png" },
    { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg" },
  ];

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setQuery(`${brand} car illustration`);
    setPage(1);
  };

 useEffect(() => {
  async function fetchImages() {
    try {
      // Step 1: Query params banaye with filters
      const params = new URLSearchParams({
        key: PIXABAY_KEY,
        q: query ? encodeURIComponent(query) : "car", // agar query empty hai to fallback
        per_page: 50,
        page,
        ...filters, // ✅ yahan se sari dropdown wali values add ho jaengi
      });

      // Step 2: URL ready
      const url = `https://pixabay.com/api/?${params.toString()}`;

      // Step 3: API call
      const response = await fetch(url);

      // Step 4: JSON convert
      const result = await response.json();

      // Step 5: Agar page 1 hai to replace karo
      if (page === 1) {
        setImages(result.hits);
      } else {
        // Step 6: Agar page > 1 hai to append karo
        setImages((previousImages) => [...previousImages, ...result.hits]);
      }
    } catch (error) {
      // Step 7: Error handling
      console.error("❌ Error while fetching images:", error);
    }
  }

  // Step 8: Call the function
  fetchImages();
}, [query, page, filters]); // ✅ filters ko dependency me add karna zaroori hai

  // Download handler
  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <>
      <Sidebar />
      <div className="pl-40 pr-10 ">
         <Filter
          onFilterChange={(type, value) => {
            setFilters((prev) => ({
              ...prev,
              [type]: value,
            }));
            setPage(1);
          }}
        />
        {/* 🔍 Search Bar */}
        <div className="flex flex-col mt-22  mb-10 ">
          <div className="flex  w-full max-w-6xl">
            <input
              type="text"
              placeholder="Search cars..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 border  rounded-l-lg focus:ring-2 focus:ring-red-500 outline-none"
            />

          </div>
          {/* 🎨 Illustration Filter Buttons */}
          <div className="flex flex-wrap   ">
            <button
              onClick={() => setQuery("car illustration colorful background")}
              className="pr-4 py-2  hover:text-red-500  transition"
            >
              Colorful Cars
            </button>

            <button
              onClick={() => setQuery("sports car illustration digital art")}
              className="px-4 py-2  hover:text-red-500 transition"
            >
              Sports Car Art
            </button>

            <button
              onClick={() => setQuery("car concept art")}
              className="px-4 py-2  hover:text-red-500  transition"
            >
              Concept Cars
            </button>

            <button
              onClick={() => setQuery("fantasy car illustration")}
              className="px-4 py-2  hover:text-red-500  transition"
            >
              Fantasy Cars
            </button>

            <button
              onClick={() => setQuery("retro vintage car illustration")}
              className="px-4 py-2  hover:text-red-500  transition"
            >
              Retro Cars
            </button>

            <button
              onClick={() => setQuery("futuristic car concept digital art")}
              className="px-4 py-2  hover:text-red-500 transition"
            >
              Futuristic Cars
            </button>

            <button
              onClick={() => setQuery("minimalist car line art illustration")}
              className="px-4 py-2  hover:text-red-500  transition"
            >
              Minimalist Cars
            </button>

            <button
              onClick={() => setQuery("minimalist car line art illustration")}
              className="px-4 py-2  hover:text-red-500  transition"
            >
              Minimalist Cars
            </button>

            <button
              onClick={() => setQuery("Cyburpunk car line art illustration")}
              className="px-4 py-2  hover:text-red-500  transition"
            >
              Cyberpunk Cars
            </button>
          </div>

          {/* Showing results for... */}
          {query && (
            <p className="mt-2 text-gray-600 text-sm">
              Showing results for: <span className="font-semibold text-red-600">{query}</span>
            </p>
          )}
        </div>

        <div className="flex gap-6 mb-10">
          {/* 1️⃣ Illustration Section */}
          <div className="flex-1 rounded-2xl p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-3">🎨 </h2>
            <p className="text-sm leading-relaxed">
              Explore a wide variety of <span className="font-semibold">car illustrations</span>
              including concept art, futuristic designs, and vibrant digital creations.
            </p>
            <button className="mt-20 px-5 py-2 bg-white text-purple-700 font-semibold rounded-sm  shadow hover:scale-105 transition">
              Explore Illustrations
            </button>
          </div>

          {/* 2️⃣ Collections Section */}
          <div className="flex-1 rounded-2xl p-5 bg-gray-100 dark:bg-gray-800 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white"> Collections</h2>

            <div className="space-y-3">
              {[
                { name: "Classic Cars", img: "/images/illu1.png" },
                { name: "Futuristic Cars", img: "/images/illu2.jpg" },
                { name: "Sports Cars", img: "/images/illu3.jpg" },
              ].map((col) => (
                <div
                  key={col.name}
                  className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-md p-2 shadow-sm hover:scale-105 transition "
                >
                  {/* Smaller Illustration Image */}
                  <img
                    src={col.img}
                    alt={col.name}
                    className="w-10 h-10 object-contain rounded-md"
                  />
                  {/* Smaller Text */}
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {col.name}
                  </span>
                </div>
              ))}
            </div>
          </div>


          {/* 3️⃣ Trending Section */}
          <div className="flex-1 rounded-2xl p-6 bg-gray-100 dark:bg-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 dark:text-white"> Trending</h2>

            <div className="flex flex-wrap gap-2">
              {["Sports Car", "Neon", "Futuristic", "Concept Art", "Cyberpunk", "Luxury", "Minimal"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-sm text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>





        {/* 🚗 Brand Logos Sidebar (Left Side Horizontal Layout) */}
        <div className="fixed top-16 left-16 h-135 w-20 bg-white shadow-lg flex flex-col items-center gap-6 py-6 overflow-y-auto">
          {brands.map((b) => (
            <button
              key={b.name}
              onClick={() => handleBrandClick(b.name)}
              className={`flex flex-col items-center space-y-1 transition ${selectedBrand === b.name
                ? "border-2 border-red-600 rounded-lg p-2 bg-gray-100"
                : "hover:scale-110"
                }`}
            >
              <img
                src={b.logo}
                alt={b.name}
                className="w-10 h-10 object-contain"
              />
              <span className="text-[10px] text-gray-700">{b.name}</span>
            </button>
          ))}
        </div>



        {/* 🖼️ Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
          columnClassName="masonry-column"
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group mb-4 "
              onClick={() => setSelectedPhoto(img)}
            >
              <img
                src={img.webformatURL}
                alt={img.tags}
                className="w-full shadow-md"
              />

                        <Overlay img={img} />

            </div>
          ))}
        </Masonry>

        {/* 📥 Load More */}
        {images.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
              Load More
            </button>
          </div>
        )}

      <Modal 
  selectedPhoto={selectedPhoto} 
  setSelectedPhoto={setSelectedPhoto} 
  handleDownload={handleDownload} 
/>
      </div>
    </>
  );
};

export default CarIllustrations;
