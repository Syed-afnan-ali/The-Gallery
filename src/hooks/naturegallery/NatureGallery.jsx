import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

const PIXABAY_KEY = "52317977-b9297d2de2506c0e93c32e187";

const NatureGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  const fetchGalleryImages = async () => {
    try {
      const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=nature&image_type=photo&per_page=50`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.hits) {
        // Randomly pick 6 images
        const shuffled = data.hits.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setGalleryImages(selected);
      }
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <div className="w-full pl-25 pr-10 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Nature Gallery
      </h2>
      <p className="text-center max-w-3xl mx-auto text-gray-600 mb-10 text-lg">
        Explore our curated collection of stunning nature photography.
      </p>

      <Masonry
        breakpointCols={{ default: 3, 1024: 3, 768: 2, 640: 1 }}
        className="flex gap-6"
        columnClassName="masonry-column"
      >
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group relative"
          >
            <img
              src={img.webformatURL}
              alt={img.tags}
              className="w-full object-cover h-72 md:h-80 lg:h-96 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold text-center px-2">
                {img.tags}
              </p>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default NatureGallery;
