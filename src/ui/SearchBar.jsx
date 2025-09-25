import React, { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search images..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex sticky top-16 z-50 left-16 w-full max-w-7xl mx-auto mb-10
                 bg-white shadow-md rounded-sm overflow-hidden border border-gray-200"
    >
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow px-6 py-3 text-gray-700 text-lg focus:outline-none 
                   focus:ring-2 focus:ring-red-900"
      />

      {/* Button */}
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-black to-red-900 
                   text-white font-semibold hover:from-red-900 hover:to-black 
                   transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
