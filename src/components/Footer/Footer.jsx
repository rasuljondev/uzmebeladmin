"use client";

import { config } from "../../config/config";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16 px-16 text-center">
      <div className="flex justify-around flex-wrap gap-8 max-w-5xl mx-auto">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">{config.companyName}</h3>
          <p className="text-white">{config.phoneNumber}</p>
          <p className="text-white">{config.email}</p>
        </div>
        <div className="social-media">
          <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex gap-4 justify-center">
            {config.socialLinks.map((link, index) => (
              <a key={index} href={link.url} className="text-primary hover:text-red-700">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}