"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map() {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to a default location (e.g., New York City)
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
    }
  }, []);

  // Load Google Maps once we have a location
  useEffect(() => {
    if (!userLocation) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(async (google) => {
      const map = new google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 12,
      });
      new google.maps.Marker({
        position: userLocation,
        map: map,
      });
    }).catch((error) => {
      console.error("Failed to load Google Maps:", error);
    });
  }, [userLocation]);

  return (
    <section className="py-20 px-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Find Us</h2>
      <div ref={mapRef} id="map" className="w-full h-[400px] max-w-5xl mx-auto rounded-xl shadow-md"></div>
    </section>
  );
}