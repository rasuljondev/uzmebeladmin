"use client";

import { config } from "../../../../../config/config";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react"; // Added useEffect import
import Header from "../Header/Header";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getInitialSettings = () => {
    if (typeof window !== "undefined") {
      const storedSettings = JSON.parse(localStorage.getItem("settings")) || {};
      return {
        heroImages: storedSettings.heroImages || config.heroImages || ["/assets/sofa_home.jpg", "/assets/home_2.png"],
      };
    }
    return { heroImages: config.heroImages || ["/assets/sofa_home.jpg", "/assets/home_2.png"] };
  };

  const [settings] = useState(getInitialSettings());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % settings.heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [settings.heroImages]);

  const handleShopNow = () => {
    document.getElementById("categories").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="h-screen relative flex flex-col justify-between text-gray-800 p-10 overflow-hidden">
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 z-0"
            key={settings.heroImages[currentImageIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={settings.heroImages[currentImageIndex]}
              alt="Hero Background"
              fill
              sizes="100vw"
              className="object-cover"
              priority={currentImageIndex === 0}
              loading={currentImageIndex !== 0 ? "lazy" : undefined}
              quality={75}
            />
          </motion.div>
        </AnimatePresence>
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
    </div>
  );
}