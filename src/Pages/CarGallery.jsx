
import React, { useState, useEffect } from "react";
import Sidebar from "../hooks/cargallery/Sidebar";
import { Heart } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";
import Filter from "../ui/Filter";


const PIXABAY_KEY = "52317977-b9297d2de2506c0e93c32e187";


const brands = [
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", details: "Founded: 1916 | Country: Germany\nTagline: The Ultimate Driving Machine." },
  { name: "Audi", logo: "/images/audi.png", details: "Founded: 1909 | Country: Germany\nTagline: Vorsprung durch Technik (Advancement through Technology)." },
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg", details: "Founded: 1937 | Country: Japan\nTagline: Let's Go Places." },
  { name: "Ferrari", logo: "/images/ferrary.png", details: "Founded: 1939 | Country: Italy\nTagline: We Are the Competition." },
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", details: "Founded: 1926 | Country: Germany\nTagline: The Best or Nothing." },
  { name: "Porsche", logo: "/images/porsche.png", details: "Founded: 1931 | Country: Germany\nTagline: There Is No Substitute." },
  { name: "Hyundai", logo: "/images/hyundai.png", details: "Founded: 1967 | Country: South Korea\nTagline: New Thinking. New Possibilities." },
  { name: "Nissan", logo: "/images/nissan.png", details: "Founded: 1933 | Country: Japan\nTagline: Innovation That Excites." },
  { name: "Lamborghini", logo: "/images/lambo.png", details: "Founded: 1963 | Country: Italy\nTagline: Expect the Unexpected." },
  { name: "Chevrolet", logo: "/images/chev.png", details: "Founded: 1911 | Country: USA\nTagline: Find New Roads." },
  { name: "Honda", logo: "/images/honda.png", details: "Founded: 1948 | Country: Japan\nTagline: The Power of Dreams." },
  { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg", details: "Founded: 1903 | Country: USA\nTagline: Built Ford Tough." },
  { name: "Bentley", logo: "/images/bently.png", details: "Founded: 1919 | Country: United Kingdom\nTagline: Be Extraordinary." },
  { name: "Mazda", logo: "/images/mazda.png", details: "Founded: 1920 | Country: Japan\nTagline: Feel Alive." },
  { name: "McLaren", logo: "/images/jaguar.png", details: "Founded: 1963 | Country: United Kingdom\nTagline: Innovation Through Technology." },
  { name: "Jaguar", logo: "/images/jag.png", details: "Founded: 1935 | Country: United Kingdom\nTagline: The Art of Performance." },
];

const CarGallery = () => {
  const [brand, setBrand] = useState(brands[0].name);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [filters, setFilters] = useState({}); // ✅ filters store karne ke liye
  

  // likes ko photo ke id se track karenge
  const [likes, setLikes] = useState({});

  // inside component
  const [searchParams] = useSearchParams();
  const collection = searchParams.get("collection");

  useEffect(() => {
    if (collection) {
      setSearchTerm(collection);
      setPhotos([]);
      setPage(1);
    }
  }, [collection]);

  const toggleLike = (photoId) => {
    setLikes((prevLikes) => {
      const current = prevLikes[photoId] || 0;
      const isLiked = prevLikes[`user_${photoId}`]; // check if user liked

      if (isLiked) {
        // unlike
        return { ...prevLikes, [photoId]: current - 1, [`user_${photoId}`]: false };
      } else {
        // like
        return { ...prevLikes, [photoId]: current + 1, [`user_${photoId}`]: true };
      }
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSelectedPhoto]);


  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setQuery("");
    setSearchTerm("");
  }, [brand]);

   useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = encodeURIComponent(`${brand} ${searchTerm ? searchTerm + " " : ""}car`);

        // filters ko query string me add karne ka tarika
        const params = new URLSearchParams({
          key: PIXABAY_KEY,
          q,
          image_type: "photo",
          per_page: 50,
          page,
          ...filters, // ✅ yahan sari dropdown values lag jaengi
        });

        const response = await fetch(`https://pixabay.com/api/?${params.toString()}`);
        const data = await response.json();
        const hits = data.hits || [];
        setPhotos((prev) => (page === 1 ? hits : [...prev, ...hits]));
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to fetch photos. Check console for details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [brand, page, searchTerm, filters]); // ✅ filters dependency me add karna na bhoolna

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed === searchTerm) return;
    setSearchTerm(trimmed);
    setPhotos([]);
    setPage(1);
  };

  const handleClear = () => {
    setQuery("");
    setSearchTerm("");
    setPhotos([]);
    setPage(1);
  };

  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name || "car.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };





  const selectedBrand = brands.find((b) => b.name === brand);

  return (
    <>
      <Sidebar />
      <div className="px-10 ml-10 font-sans  bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black min-h-screen text-gray-900 dark:text-gray-100">
  <Filter
          onFilterChange={(type, value) => {
            setFilters((prev) => ({
              ...prev,
              [type]: value,
            }));
            setPage(1);
          }}
        />
        {/* Heading */}
        <h1 className="text-7xl font-extrabold mb-10 mt-10 text-center relative">
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-red-600 via-black to-red-700 bg-clip-text text-transparent drop-shadow-lg">
              Discover the Gallery
            </span>
            <span className="absolute inset-0 -top-3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full border-8 border-red-500/50 blur-md"></span>
          </span>{" "}
        </h1>

        {/* Sticky Wrapper */}
        {/* ... (aapka pura brands/search wala code same rakha hai) ... */}

        {/* Brands Bar */}
        <div className="flex z-40 top-16  bg-white/90 pt-2 sticky gap-6  overflow-x-auto flex-nowrap pb-4 scrollbar-thin scrollbar-thumb-gray-500">
          {brands.map((b) => (
            <div
              key={b.name}
              onClick={() => setBrand(b.name)}
              className={` p-5 rounded-2xl shadow-lg flex flex-col items-center min-w-[160px] transition transform hover:scale-105 hover:shadow-2xl ${brand === b.name
                ? "bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-600 border-2 border-red-500"
                : "bg-white/80 dark:bg-gray-700"
                }`}
            >
              <img src={b.logo} alt={b.name} className="h-16 mb-3 object-contain drop-shadow-sm" />
              <h2 className="text-lg font-semibold whitespace-nowrap">{b.name}</h2>
            </div>
          ))}
        </div>

        <div className="   bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md">

          {/* Brand Details + Search + Buttons */}
          {selectedBrand && (
            <div className="flex  flex-col md:flex-row items-center justify-between py-2 px-6">
              <div className="text-center  whitespace-pre-line text-lg text-gray-700 dark:text-gray-200 font-medium mb-4 md:mb-0">
                {selectedBrand.details}
              </div>

              <div className=" flex-col  w-210 md:flex-row items-center ">


                {/* Search bar */}
                <form onSubmit={handleSearchSubmit} className="flex justify-end items-center gap-2 mb-4 md:mb-0">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${brand} models (e.g. "M3", "SUV")`}
                    className="w-full  max-w-2xl px-5 py-3 rounded-xl bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-red-400 shadow-lg transition"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3  bg-gradient-to-r from-black to-red-700 text-white font-semibold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-3  bg-gray-300 dark:bg-gray-600 rounded-xl font-medium shadow hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                  >
                    Clear
                  </button>
                </form>

                {/* Category buttons */}
                <div className="flex justify-start ml-16 gap-2">
                  <button
                    onClick={() => {
                      setSearchTerm("premium");
                      setPhotos([]);
                      setPage(1);
                    }}
                    className="px-2 py-3   text-black  rounded-xl  hover:text-red-900 transition"
                  >
                    Premium Cars
                  </button>

                  <button
                    onClick={() => {
                      setSearchTerm("sports");
                      setPhotos([]);
                      setPage(1);
                    }}
                    className="px-2 py-3   text-black  rounded-xl  hover:text-red-900 transition"
                  >
                    Sports Cars
                  </button>

                  <button
                    onClick={() => {
                      setSearchTerm("electric");
                      setPhotos([]);
                      setPage(1);
                    }}
                    className="px-2 py-3   text-black  rounded-xl  hover:text-red-900 transition"
                  >
                    Electric Cars
                  </button>

                  <button
                    onClick={() => {
                      setSearchTerm("Bold");
                      setPhotos([]);
                      setPage(1);
                    }}
                    className="px-2 py-3   text-black  rounded-xl  hover:text-red-900 transition"
                  >
                    Bold Cars
                  </button>

                  <button
                    onClick={() => {
                      setSearchTerm("Stylish");
                      setPhotos([]);
                      setPage(1);
                    }}
                    className="px-2 py-3   text-black  rounded-xl  hover:text-red-900 transition"
                  >
                    Stylish Cars
                  </button>

                </div>
              </div>
            </div>
          )}
        </div>

        {/* Photos grid */}
        <div className="columns-2 sm:columns-3 md:columns-4 gap-3 [column-fill:_balance]">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative mb-3 group "
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Image */}
              <img
                src={photo.webformatURL}
                alt={photo.tags || brand}
                className="rounded-xl shadow-md w-full"
              />

           <Overlay img={photo} />
            </div>
          ))}
        </div>





<Modal 
  selectedPhoto={selectedPhoto} 
  setSelectedPhoto={setSelectedPhoto} 
  handleDownload={handleDownload} 
  brand={brand}
/>

        {/* Status */}
        <div className="text-center mb-6">
          {loading && <p className="animate-pulse text-lg">Loading...</p>}
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          {!loading && !error && searchTerm && (
            <p className="text-gray-700 dark:text-gray-300">
              Showing results for: <span className="font-semibold">{brand} {searchTerm}</span>
            </p>
          )}
        </div>

        {/* Load More */}
        <div className="text-center py-10">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-8 py-3 bg-gradient-to-r from-black to-red-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition"
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default CarGallery;
