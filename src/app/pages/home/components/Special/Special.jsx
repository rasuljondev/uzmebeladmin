"use client";

import { config } from "../../../../../config/config";
import Image from "next/image";

export default function Special() {
  return (
    <section className="py-20 px-16 bg-white text-center">
      <div className="flex justify-center items-center gap-10 bg-gray-100 p-8 rounded-xl max-w-3xl mx-auto shadow-md">
        <Image
          src={config.special.image}
          alt={config.special.name}
          width={350}
          height={250}
          loading="lazy"
          quality={75}
          className="rounded-lg object-cover w-full h-auto"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{config.special.name}</h2>
          <p className="text-xl text-gray-700">{config.special.price}</p>
          <p className="text-lg text-[#ff6b6b] line-through">{config.special.originalPrice}</p>
        </div>
      </div>
    </section>
  );
}