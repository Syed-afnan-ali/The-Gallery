import React, { useState } from "react";
import { Heart } from "lucide-react";

const Gallery = ({ photos, brand }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (photo) => {
    if (favorites.find((fav) => fav.id === photo.id)) {
      // agar already favorite hai -> remove
      setFavorites(favorites.filter((fav) => fav.id !== photo.id));
    } else {
      // otherwise add
      setFavorites([...favorites, photo]);
    }
  };

  return (
    <div className="relative">
      {/* Gallery */}
      <div className="columns-2 sm:columns-3 md:columns-3 gap-3 [column-fill:_balance]">
        {photos.map((photo) => (
          <div key={photo.id} className="relative mb-3">
            <img
              src={photo.webformatURL}
              alt={photo.tags || brand}
              className="rounded-xl shadow-md w-full  transform hover:scale-105 hover:rotate-1 transition"
            />

            {/* Heart Icon on bottom-right */}
            <button
              onClick={() => toggleFavorite(photo)}
              className="absolute bottom-2 right-2 bg-white/80 rounded-full p-2 shadow hover:scale-110 transition"
            >
              <Heart
                size={20}
                className={`${
                  favorites.find((fav) => fav.id === photo.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Favorites Counter (bottom-right) */}
      {favorites.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg">
          {favorites.length}
        </div>
      )}
    </div>
  );
};

export default Gallery;
