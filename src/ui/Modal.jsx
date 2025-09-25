import React from "react";

const Modal = ({ selectedPhoto, setSelectedPhoto, handleDownload, brand }) => {
  if (!selectedPhoto) return null; // agar photo select na ho to kuch bhi return na ho

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal container */}
      <div className="relative max-w-5xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedPhoto(null)}
          aria-label="Close image"
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/95 dark:bg-gray-800 flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-800 dark:text-gray-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
              1.414L11.414 10l4.293 4.293a1 1 0 
              01-1.414 1.414L10 11.414l-4.293 
              4.293a1 1 0 
              01-1.414-1.414L8.586 10 
              4.293 5.707a1 1 0 
              010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* IMAGE */}
        <div className="bg-black flex justify-center items-center">
          <img
            src={selectedPhoto.largeImageURL}
            alt={selectedPhoto.tags || "Car Image"}
            className="w-full max-h-[80vh] object-contain bg-black z-10"
            draggable={false}
          />
        </div>

        {/* BOTTOM INFO BAR */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="text-left">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedPhoto.tags || "Car Image"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <span className="text-lg">❤️</span>
              <span className="font-semibold">{selectedPhoto.likes ?? 0}</span>
            </div>

            <button
              onClick={() =>
                handleDownload(selectedPhoto.largeImageURL, `${brand}.jpg`)
              }
              className="px-5 py-2 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-lg shadow hover:scale-105 transition"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
