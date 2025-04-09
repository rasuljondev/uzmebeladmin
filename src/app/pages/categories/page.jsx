"use client";

import { config } from "../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = config.categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactScroll = () => {
    document.querySelector("footer").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center text-gray-800 p-10 bg-white shadow-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Image
            src={config.logoUrl}
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
          <span className="text-4xl font-semibold text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
            {config.companyName}
          </span>
        </div>
        <nav>
          <ul className="flex gap-10">
            <li>
              <Link href="/" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pages/categories"
                className="text-lg text-[#ff6b6b] font-bold border-b-2 border-[#ff6b6b] transition-colors duration-300"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link href="/pages/special" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
                Special
              </Link>
            </li>
            <li>
              <button
                onClick={handleContactScroll}
                className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          <input
            type="text"
            className="p-2 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
            {config.phoneNumber}
          </span>
        </div>
      </header>

      {/* Categories Section */}
      <section className="py-20 px-16">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Explore Our Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={index}
              layoutId={`category-${category.name.toLowerCase().replace(/\s+/g, "-")}`} // Unique layoutId
              className="relative group rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <Link href={`/pages/subcategory/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-[300px] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <h2 className="text-white text-2xl font-semibold p-6">{category.name}</h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}