"use client";

import { useState } from "react";
import { config } from "../../../../../config/config";

export default function SearchBar({ onSearch, placeholder = "Search" }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="p-2 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] w-full max-w-[200px]" // Changed max-w-xs to max-w-[200px]
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleSearch}
    />
  );
}