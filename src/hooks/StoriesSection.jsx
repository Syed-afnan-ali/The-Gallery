import React from "react";

const StoriesSection = () => {
  return (
    <section className="w-full px-6 md:px-12 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Big Card */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <video
            src="/video/bmw.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Careers</h2>
            <button className="px-6 py-2 bg-white text-black font-medium rounded-md shadow hover:bg-gray-200 transition">
              Read more
            </button>
          </div>
        </div>

        {/* Right Side Grid */}
        <div className="grid grid-rows-2 gap-6">
          
          {/* Tech Stories */}
          <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/cars.avif"
              alt="Tech Stories"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Tech Stories</h2>
              <button className="px-5 py-2 border border-white font-medium rounded-md hover:bg-white hover:text-black transition">
                View all
              </button>
            </div>
          </div>

          {/* Audi Spirit */}
          <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/cars2.avif"
              alt="Audi Spirit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Audi Spirit</h2>
              <button className="px-6 py-2 bg-white text-black font-medium rounded-md shadow hover:bg-gray-200 transition">
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
