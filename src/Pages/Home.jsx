import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const collections = [
    {
      name: "Sports Cars",
      value: "sports",
      img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg", // sports car image
    },
    {
      name: "Luxury Cars",
      value: "luxury",
      img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg", // luxury car
    },
    {
      name: "Electric Cars",
      value: "electric",
      img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg", // electric car
    },
    {
      name: "SUVs",
      value: "suv",
      img: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg", // suv car
    },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source
          src="/video/original-9c94a27b019688ee5cc12e7fdee8f02d.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Main Text */}
      <div
        className={`absolute top-1/3 left-10 md:left-20 max-w-xl transition-opacity duration-1000 ${showText ? "opacity-100" : "opacity-0"
          }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-200 via-white to-red-500 bg-clip-text text-transparent drop-shadow-lg leading-tight">
          Experience The Power
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Luxury • Speed • Style – All in One Drive
        </p>
        <Link
          to="/CarGallery" // replace with your route
          className="mt-6 px-6 py-3 bg-red-600 rounded-lg text-lg font-bold hover:bg-red-700 transition inline-block text-center"
        >
          Explore Now
        </Link>
      </div>

      {/* Collections Box */}
      <div
        className={`absolute top-1/3 right-10 md:right-20 bg-white/20 dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-72 transition-all duration-1000 transform ${showText
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-10"
          }`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Car Collections
        </h2>
        <ul className="space-y-3">
          {collections.map((c, i) => (
            <li key={i}>
              <button
                onClick={() => navigate(`/gallery?collection=${c.value}`)}
                className="flex items-center w-full gap-3 p-2 rounded-lg bg-gray/20 dark:bg-gray-700 hover:bg-red-600 hover:text-white transition"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-14 h-10 object-cover rounded-md"
                />
                <span className="font-medium">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
