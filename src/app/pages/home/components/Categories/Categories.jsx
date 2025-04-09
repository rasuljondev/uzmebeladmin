"use client";

import { config } from "../../../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // Added useEffect

export default function Categories() {
  const [categories, setCategories] = useState(config.categories);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
      setCategories(storedCategories);
    }
  }, []);

  return (
    <section id="categories" className="py-20 px-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={category.name} // Use name as key for uniqueness
            className="relative group rounded-xl overflow-hidden shadow-md bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
          >
            <Link href={`/pages/subcategory/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={200}
                className="object-cover w-full h-[200px] transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <h3 className="text-white text-xl font-semibold p-6">{category.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}