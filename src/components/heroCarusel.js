"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    title: "Ixlos magnit tez orada ishga tushamiz",
    subtitle: "Get the right parts or your money back.",
    cta: "Shop now",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    title: "Discover performance parts",
    subtitle: "Boost your vehicle's power with ease.",
    cta: "Explore now",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    title: "Discover performance parts",
    subtitle: "Boost your vehicle's power with ease.",
    cta: "Explore now",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [current, paused]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden mt-4">
      <div className="flex transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-start px-8 md:px-16">
              <div className="text-white max-w-md space-y-4">
                <p className="text-sm font-medium">
                  <span className="inline-block align-middle mr-2">✔</span>
                  EBAY GUARANTEED FIT
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-md md:text-lg">{slide.subtitle}</p>
                <button className="mt-2 px-5 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
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
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200"
        >
          →
        </button>
        <button
          onClick={() => setPaused((prev) => !prev)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200"
        >
          {paused ? "▶" : "⏸"}
        </button>
      </div>
    </div>
  );
}
