"use client";

import { config } from "../../../../../config/config"; // From src/app/pages/home/components/ShowroomSection/
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ShowroomSection({ imageOnRight }) {
  const [showroomData, setShowroomData] = useState(config.showroom);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("settings")) || {};
    const showroom = storedSettings.showroom || config.showroom;
    setShowroomData(showroom);
  }, []);

  const section = imageOnRight ? showroomData[0] : showroomData[1];

  return (
    <section className="py-20 px-16 flex flex-col md:flex-row items-center gap-10 bg-gray-50">
      {imageOnRight ? (
        <>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <p className="text-gray-600">{section.description}</p>
          </div>
          <div className="md:w-1/2">
            <Image
              src={section.image}
              alt={section.title}
              width={500}
              height={300}
              className="object-cover rounded-lg"
              quality={75}
            />
          </div>
        </>
      ) : (
        <>
          <div className="md:w-1/2">
            <Image
              src={section.image}
              alt={section.title}
              width={500}
              height={300}
              className="object-cover rounded-lg"
              quality={75}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <p className="text-gray-600">{section.description}</p>
          </div>
        </>
      )}
    </section>
  );
}