"use client";

import { config } from "../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "../home/components/Header/Header";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(config.categories);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
      setCategories(storedCategories);
    }
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <section className="py-20 px-16">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Explore Our Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.name}
              layoutId={`category-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
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