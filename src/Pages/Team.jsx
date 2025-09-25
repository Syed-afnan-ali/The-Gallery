import React from "react";
import Sidebar from "../hooks/cargallery/Sidebar";


export default function Team() {
  return (
    <>
    <Sidebar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-red-900">
      <div className="text-center p-10 bg-white/50 rounded-2xl shadow-lg max-w-2xl">
        {/* Heading */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          🚧 Join Our Team
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-600">
          This page is currently <span className="font-semibold">under construction</span>.
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Please check back soon for updates!
        </p>

        {/* Small footer note */}
        <div className="mt-6 text-sm text-gray-500 italic">
          Thank you for your patience 💙
        </div>
      </div>
    </div>
    </>
  );
}
