"use client";

import { config } from "../../../config/config";
import Header from "../home/components/Header/Header";

export default function SpecialPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <section className="py-20 px-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Special Offers</h1>
        <p className="text-gray-800">Special offers coming soon!</p>
      </section>
    </div>
  );
}