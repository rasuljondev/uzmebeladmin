"use client";

import { config } from "../../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react"; // Added useEffect
import SearchBar from "../../home/components/SearchBar/SearchBar";
import Header from "../../home/components/Header/Header";

export default function SubcategoryPage() {
  const { category } = useParams();
  const [categories, setCategories] = useState(config.categories);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
      setCategories(storedCategories);
    }
  }, []);

  const selectedCategory = categories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === category
  );
  const allProducts = selectedCategory?.subcategories.flatMap((sub) => sub.products) || [];
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => setSearchQuery(query);

  if (!selectedCategory) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <section className="py-20 px-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Category Not Found</h1>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <section className="py-20 px-16 flex flex-col items-center min-h-[calc(100vh-160px)]">
        <motion.h1
          layoutId={`category-${category}`}
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {selectedCategory.name} Subcategories
        </motion.h1>
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="Search products..." />
        </div>
        {searchQuery ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id || product.name} // Use id or name for uniqueness
                  className="relative w-[300px] h-[400px] rounded-lg overflow-hidden shadow-lg group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 flex items-end">
                    <h2 className="text-white text-xl font-semibold p-6">{product.name}</h2>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-800 text-lg">No products found</p>
            )}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {selectedCategory.subcategories.map((subcategory) => (
              <motion.div
                key={subcategory.name}
                className="relative w-[300px] h-[400px] rounded-lg overflow-hidden shadow-lg group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05, rotate: 2, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
              >
                <Link href={`/pages/products/${category}/${subcategory.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Image
                    src={subcategory.image}
                    alt={subcategory.name}
                    width={300}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <h2 className="text-white text-xl font-semibold p-6">{subcategory.name}</h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}