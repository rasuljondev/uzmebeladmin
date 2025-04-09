"use client";

import { config } from "../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../../../components/Header/Header";
import { useState } from "react";

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => setSearchQuery(query); // Placeholder

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <section className="py-20 px-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Contact Us</h1>
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-600 text-lg">Map Coming Soon (Lat: {config.mapLocation.lat}, Lng: {config.mapLocation.lng})</p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
              <p className="text-gray-600 mt-2">We’d love to hear from you!</p>
            </div>
            <div>
              <p className="text-lg text-gray-800"><strong>Phone:</strong> {config.phoneNumber}</p>
              <p className="text-lg text-gray-800"><strong>Email:</strong> <a href={`mailto:${config.email}`} className="text-[#ff6b6b] hover:underline">{config.email}</a></p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Follow Us</h3>
              <div className="flex gap-4 mt-2">
                {config.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}