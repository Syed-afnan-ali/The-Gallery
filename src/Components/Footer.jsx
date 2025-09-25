import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaCarAlt, FaDownload } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black pl-16 text-gray-300 pt-26  pb-6 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left: Logo / About */}
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <FaCarAlt className="text-red-500" /> CarGallery
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Explore and download high-quality car photos. 
            From classic rides to the latest supercars 🚗✨
          </p>
        </div>

        {/* Middle: Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-red-500">🏠 Home</a></li>
            <li><a href="/explore" className="hover:text-red-500">🚘 Explore Cars</a></li>
            <li><a href="/brands" className="hover:text-red-500">🏎️ Popular Brands</a></li>
            <li><a href="/downloads" className="hover:text-red-500 flex items-center gap-1"><FaDownload /> Download</a></li>
          </ul>
        </div>

        {/* Right: Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-red-500"><FaFacebook /></a>
            <a href="#" className="hover:text-red-500"><FaTwitter /></a>
            <a href="#" className="hover:text-red-500"><FaInstagram /></a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            📩 contact@cargallery.com
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CarGallery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
