import React from "react";

const Filter = ({ onFilterChange }) => {
  return (
    <div className="flex pt-20 flex-wrap gap-4 mb-10  ">
      {/* 1. Picture Orientation */}
      <select
        onChange={(e) => onFilterChange("orientation", e.target.value)}
        className="px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   hover:border-blue-400 transition text-gray-700"
      >
        <option value="">📐 Orientation</option>
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>

      {/* 2. Picture Size */}
      <select
        onChange={(e) => onFilterChange("image_size", e.target.value)}
        className="px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-green-500 
                   hover:border-green-400 transition text-gray-700"
      >
        <option value="">📏 Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      {/* 3. Picture Color */}
      <select
        onChange={(e) => onFilterChange("colors", e.target.value)}
        className="px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 
                   hover:border-purple-400 transition text-gray-700"
      >
        <option value="">🎨 Color</option>
        <option value="red">Red 🔴</option>
        <option value="blue">Blue 🔵</option>
        <option value="green">Green 🟢</option>
        <option value="yellow">Yellow 🟡</option>
        <option value="black">Black ⚫</option>
        <option value="white">White ⚪</option>
      </select>

      {/* 4. Content Type */}
      <select
        onChange={(e) => onFilterChange("image_type", e.target.value)}
        className="px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-red-500 
                   hover:border-red-400 transition text-gray-700"
      >
        <option value="">📂 Content Type</option>
        <option value="photo">Authentic Photos 📸</option>
        <option value="illustration">Illustrations 🎨</option>
        <option value="vector">Vector Images 🖼️</option>
      </select>

      {/* 5. Category */}
      <select
        onChange={(e) => onFilterChange("category", e.target.value)}
        className="px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-yellow-500 
                   hover:border-yellow-400 transition text-gray-700"
      >
        <option value="">🗂️ Category</option>
        <option value="backgrounds">Backgrounds</option>
        <option value="animals">Animals</option>
        <option value="fashion">Fashion</option>
        <option value="food">Food</option>
        <option value="nature">Nature</option>
        <option value="sports">Sports</option>
        <option value="travel">Travel</option>
      </select>

   
    </div>
  );
};

export default Filter;
