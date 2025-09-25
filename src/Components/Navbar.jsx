// Navbar.jsx
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full bg-white/30 backdrop-blur shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                className="w-[120px] object-contain"
                src="/images/logo.png"
                alt="CarGallery Logo"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 font-medium text-gray-700">
              <Link to="/" className="hover:text-red-600 transition">
                The Gallery
              </Link>
              <Link to="/home" className="hover:text-red-600 transition">
                Art
              </Link>
            
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="focus:outline-none"
              >
                <svg
                  className="w-7 h-7 text-gray-700 hover:text-red-600 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 transition-all duration-500 ease-in-out">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-red-500 focus:outline-none"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu Links */}
          <Link
            to="/home"
            onClick={() => setIsOpen(false)}
            className="text-3xl text-white py-4 px-6 hover:text-red-500 transition-all"
          >
            Art
          </Link>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-3xl text-white py-4 px-6 hover:text-red-500 transition-all"
          >
            Cars Gallery
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-3xl text-white py-4 px-6 hover:text-red-500 transition-all"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-3xl text-white py-4 px-6 hover:text-red-500 transition-all"
          >
            Contact
          </Link>
        </div>
      )}
    </>
  );
}
