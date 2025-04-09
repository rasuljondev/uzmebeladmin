"use client";

import { config } from "../../config/config";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/assets/sofa_home.jpg", "/assets/home_2.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    document.getElementById("categories").scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (query) => {
    // Optional: Filter categories and pass to Categories if needed later
  };

  return (
    <section className="h-screen relative flex flex-col justify-between text-gray-800 p-10 overflow-hidden bg-white">
      <AnimatePresence>
        <motion.div className="absolute inset-0 z-0" key={images[currentImageIndex]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
          <Image src={images[currentImageIndex]} alt="Hero Background" fill sizes="100vw" className="object-cover" priority={currentImageIndex === 0} loading={currentImageIndex !== 0 ? "lazy" : undefined} quality={75} />
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <Image src={config.logoUrl} alt="Logo" width={60} height={60} className="object-contain" priority />
          <span className="text-4xl font-semibold text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">{config.companyName}</span>
        </div>
        <nav>
          <ul className="flex gap-10">
            <li><Link href="/" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">Home</Link></li>
            <li><Link href="/pages/categories" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">Categories</Link></li>
            <li><Link href="/pages/special" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">Special</Link></li>
            <li><Link href="/pages/contacts" className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">Contact</Link></li>
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
      </div>
      <div className="text-center absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-10 z-10">
        <h2 className="text-3xl text-gray-800">Welcome to {config.companyName}</h2>
        <motion.button
          className="px-12 py-4 text-lg bg-[#ff6b6b] text-white rounded-full cursor-pointer hover:bg-red-700 transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={handleShopNow}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
}