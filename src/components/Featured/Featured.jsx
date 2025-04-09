"use client";

import { config } from "../../config/config";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Featured() {
  return (
    <section className="py-20 px-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Featured Products</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {config.featured.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/assets/sofa_home.jpg"
              alt={item.name}
              width={300}
              height={150}
              className="rounded-lg object-cover w-full h-auto"
              loading="lazy"
              quality={75}
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg text-gray-700">{item.price}</p>
            {item.originalPrice && (
              <p className="text-md text-[#ff6b6b] line-through">{item.originalPrice}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}