"use client";

import { config } from "../../../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"; // Added useEffect
import { usePathname } from "next/navigation";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Initial state uses config defaults for SSR consistency
  const [settings, setSettings] = useState({
    companyName: config.companyName,
    logo: config.logoUrl,
    phoneNumber: config.phoneNumber,
    email: config.email,
    socialLinks: config.socialLinks,
  });

  // Update state with localStorage after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSettings = JSON.parse(localStorage.getItem("settings")) || {};
      setSettings({
        companyName: storedSettings.companyName || config.companyName,
        logo: storedSettings.logo || config.logoUrl,
        phoneNumber: storedSettings.phoneNumber || config.phoneNumber,
        email: storedSettings.email || config.email,
        socialLinks: storedSettings.socialLinks || config.socialLinks,
      });
    }
  }, []);

  const [categories] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("categories")) || config.categories
      : config.categories
  );

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const navLinkStyle = (path) =>
    `text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300 ${
      pathname === path && !isHomePage ? "text-[#ff6b6b] font-semibold" : ""
    }`;

  return (
    <header
      className={`shadow-md py-4 px-16 flex items-center justify-between ${
        isHomePage ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={settings.logo}
            alt={settings.companyName}
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{settings.companyName}</h1>
      </div>
      <nav className="flex gap-8 items-center">
        <ul className="flex gap-10">
          <li>
            <Link href="/" className={navLinkStyle("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/pages/categories" className={navLinkStyle("/pages/categories")}>
              Categories
            </Link>
          </li>
          <li>
            <Link href="/pages/special" className={navLinkStyle("/pages/special")}>
              Special
            </Link>
          </li>
          <li>
            <Link href="/pages/contacts" className={navLinkStyle("/pages/contacts")}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-6">
        <SearchBar onSearch={handleSearch} placeholder="Search" />
        <Link href="/pages/cart" className="text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </Link>
        <span className="text-lg text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300">
          {settings.phoneNumber}
        </span>
      </div>
    </header>
  );
}