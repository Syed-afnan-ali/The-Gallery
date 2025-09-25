// src/components/ui/Overlay.jsx
import React from "react";

const Overlay = ({ img }) => {
  return (
    <>
      {/* Hover Overlay Gradient */}
      <div className="absolute  inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.6)_100%)]"></div>
      </div>

      {/* Download Button */}
      <a
        href={img.largeImageURL}
        download
        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition 
                   px-3 py-1 bg-black/60 hover:bg-black text-white text-sm"
        onClick={(e) => e.stopPropagation()} // stop modal open
      >
        Download
      </a>

      {/* Likes Counter */}
      <div
        className="absolute top-2 right-2 flex items-center gap-1 text-white text-xs 
                   bg-black/60 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        ❤️ <span>{img.likes}</span>
      </div>
    </>
  );
};

export default Overlay;
