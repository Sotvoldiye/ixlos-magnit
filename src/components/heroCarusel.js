"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "./topNav.module.css";
// const slides = [
//   {
//     id: 1,
//     image: "/images/slide1.jpg",
//     title: "Ixlos magnit tez orada ishga tushamiz",
//     subtitle: "Get the right parts or your money back.",
//     cta: "Shop now",
//   },
//   {
//     id: 2,
//     image: "/images/slide2.jpg",
//     title: "Discover performance parts",
//     subtitle: "Boost your vehicle's power with ease.",
//     cta: "Explore now",
//   },
//   {
//     id: 3,
//     image: "/images/slide3.jpg",
//     title: "Discover performance parts",
//     subtitle: "Boost your vehicle's power with ease.",
//     cta: "Explore now",
//   },
// ];
import { useGetAllAdvertisementsQuery } from "@/lib/api/productApi";

export default function HeroCarousel() {
  const { data: ads, isLoading } = useGetAllAdvertisementsQuery();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length);
  };

  useEffect(() => {
    if (!paused && ads && ads.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [current, paused, ads]); // ads ni ham dependency ga qo'shish kerak

  if (isLoading) return <p className="text-center py-6">Yuklanmoqda...</p>;
  if (!ads || ads.length === 0)
    return <p className="text-center py-6">Reklama mavjud emas</p>;

  return (
    <div
      className={`relative w-full h-[300px] overflow-hidden ${style.carusel}`}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {ads.map((ads) => (
          <div key={ads.id} className="w-full flex-shrink-0 relative">
            <Image
              src={ads.image_url || "/no-image.png"}
              alt={ads.title || "Reklama rasm"}
              width={1200}
              height={300}
              className={`w-full md:h-[300px] object-contain ${style.caruselImg}`}
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-start px-8 md:px-16">
              <div className="text-white max-w-md space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  {ads.title}
                </h2>
                <p className="text-md md:text-lg">{ads.content}</p>
              </div>
            </div>
          </div>
        ))}
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
      <div className="absolute bottom-4 right-4 flex space-x-3 z-20">
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
          {paused ? <i className="fa-solid fa-play text-white"></i> : <i className="fa-solid fa-pause text-white"></i>}
        </button>
      </div>
    </div>
  );
}
