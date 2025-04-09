"use client";

import { config } from "../../../../../config/config";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Subcategories({ categoryName }) {
  const category = config.categories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === categoryName
  );

  if (!category || !category.subcategories.length) {
    return (
      <section className="py-20 px-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">No Subcategories Found</h2>
        <p className="text-lg text-gray-600">This category has no subcategories yet.</p>
      </section>
    );
  }

  return (
    <section className="py-20 px-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">{category.name} Subcategories</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {category.subcategories.map((subcategory, index) => (
          <Link
            key={index}
            href={`/${categoryName}/${subcategory.name.toLowerCase().replace(/\s+/g, "-")}`}
            passHref
          >
            <motion.div
              className="relative w-[220px] h-[220px] rounded-full shadow-lg overflow-hidden cursor-pointer mx-auto"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={subcategory.image}
                alt={subcategory.name}
                fill
                className="object-cover bg-gray-100"
                loading="lazy"
                quality={75}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-semibold">{subcategory.name}</h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}