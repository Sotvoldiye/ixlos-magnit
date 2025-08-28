"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "./topNav.module.css";
import { useGetAllAdvertisementsQuery } from "@/lib/api/productApi";

export default function HeroCarousel() {
  const { data: ads, isLoading } = useGetAllAdvertisementsQuery();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % ads.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length);

  useEffect(() => {
    if (!paused && ads?.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [paused, ads]);

  if (isLoading) return <p className="text-center py-6">Yuklanmoqda...</p>;
  if (!ads || ads.length === 0)
    return <p className="text-center py-6">Reklama mavjud emas</p>;
  const BASE_URL = "http://127.0.0.1:5000";


  return (
    <div className={`relative w-full h-[300px] md:h-[400px] overflow-hidden ${style.carusel}`}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {ads.map((ad) => {
         
         const imageUrl =
    ad?.image_url?.length > 0
      ? BASE_URL + ad.image_url
      : "/no-image.png";

         return (<div key={ad.id} className="w-full flex-shrink-0 relative">
            <Image
              src={imageUrl}
              alt={ad.title || "Reklama rasm"}
              width={180}
              height={300}
              className="w-full h-[300px] md:h-[400px] object-contain"
              priority
            />

            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-start px-4 md:px-16 bg-black/25">
              <div className="text-white max-w-md space-y-2 md:space-y-4">
                <h2 className="text-2xl md:text-5xl font-bold leading-tight">
                  {ad.title}
                </h2>
                <p className="text-sm md:text-lg">{ad.content}</p>
              </div>
            </div>
          </div>)
})}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
        <button
          onClick={prevSlide}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
        >
          <i className="fa-solid fa-arrow-left text-white"></i>
        </button>
        <button
          onClick={nextSlide}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
        >
          <i className="fa-solid fa-arrow-right text-white"></i>
        </button>
        <button
          onClick={() => setPaused((prev) => !prev)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
        >
          {paused ? (
            <i className="fa-solid fa-play text-white"></i>
          ) : (
            <i className="fa-solid fa-pause text-white"></i>
          )}
        </button>
      </div>
    </div>
  );
}
