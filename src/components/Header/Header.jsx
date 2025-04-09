"use client";

import { config } from "../../config/config"; // Adjusted path from src/components/Header/
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar"; // Assuming this path is correct

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({ companyName: "UZ Furniture", logo: "/assets/logo.jpg" });

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
    const storedSettings = JSON.parse(localStorage.getItem("settings")) || {
      companyName: config.companyName,
      logo: config.logoUrl,
    };
    setCategories(storedCategories);
    setSettings(storedSettings);
  }, []);

  const handleSearch = (query) => {
    // Placeholder for search functionality if needed later
    console.log("Search query:", query);
  };

  return (
    <header className="bg-white shadow-md py-4 px-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={settings.logo}
            alt={settings.companyName}
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{settings.companyName}</h1>
      </div>
      <nav className="flex gap-8 items-center">
        <ul className="flex gap-10">
          <li>
            <Link href="/" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
              Home
            </Link>
          </li>
          <li className="relative group">
            <span className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300 cursor-pointer">
              Categories
            </span>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 p-4 w-64 z-10">
              {categories.map((cat) => (
                <div key={cat.name} className="mb-2">
                  <Link
                    href={`/pages/products/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-gray-800 font-semibold hover:text-[#ff6b6b]"
                  >
                    {cat.name}
                  </Link>
                  <ul className="ml-4 mt-1">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={`/pages/products/${cat.name.toLowerCase().replace(/\s+/g, "-")}/${sub.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block text-gray-600 hover:text-[#ff6b6b]"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          <li>
            <Link href="/pages/special" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
              Special
            </Link>
          </li>
          <li>
            <Link href="/pages/contacts" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-6">
        <SearchBar onSearch={handleSearch} placeholder="Search" />
        <Link href="/pages/cart" className="text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </Link>
        <span className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">{config.phoneNumber}</span>
      </div>
    </header>
  );
}