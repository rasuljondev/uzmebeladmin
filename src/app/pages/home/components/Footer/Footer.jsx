"use client";

import { config } from "../../../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"; // Added useEffect

export default function Footer() {
  // Initial state with config defaults for SSR consistency
  const [settings, setSettings] = useState({
    companyName: config.companyName,
    logo: config.logoUrl,
    phoneNumber: config.phoneNumber,
    email: config.email,
    socialLinks: config.socialLinks.concat({ name: "Telegram", url: "" }),
  });
  const [userPhone, setUserPhone] = useState("");

  // Update settings with localStorage after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSettings = JSON.parse(localStorage.getItem("settings")) || {};
      setSettings({
        companyName: storedSettings.companyName || config.companyName,
        logo: storedSettings.logo || config.logoUrl,
        phoneNumber: storedSettings.phoneNumber || config.phoneNumber,
        email: storedSettings.email || config.email,
        socialLinks: storedSettings.socialLinks || config.socialLinks.concat({ name: "Telegram", url: "" }),
      });
    }
  }, []);

  const handleSend = () => {
    console.log("User phone number:", userPhone); // Placeholder for future functionality
    setUserPhone("");
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image src={settings.logo} alt={settings.companyName} width={40} height={40} className="object-contain" />
            <h3 className="text-xl font-bold">{settings.companyName}</h3>
          </Link>
          <p className="text-gray-400">Transforming homes with style and comfort.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/pages/categories" className="text-gray-400 hover:text-white transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/pages/special" className="text-gray-400 hover:text-white transition-colors">
                Special
              </Link>
            </li>
            <li>
              <Link href="/pages/contacts" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">Email: {settings.email}</p>
          <p className="text-gray-400">Phone: {settings.phoneNumber}</p>
          <div className="flex gap-4 mt-4">
            {settings.socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url || "#"}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="p-2 rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
      </div>
    </footer>
  );
}