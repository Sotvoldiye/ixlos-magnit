"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ProductGallery = ({ images, toggleFavorite, isFavorited }) => {
  const baseURL = "http://127.0.0.1:5000";
  const thumbnailContainerRef = useRef(null);

  // Format and filter image URLs
  const formattedImages = images
    ?.filter((img) => img?.url && typeof img.url === "string" && img.url.trim() !== "")
    .map((img) => `${baseURL}${img.url}`) || [];

  // Set default image if none available
  const [selectedImage, setSelectedImage] = useState(formattedImages[0] || "/no-image.png");
  const [currentIndex, setCurrentIndex] = useState(formattedImages.length > 0 ? 0 : -1);

  // Scroll handlers for left/right (mobile) and up/down (tablet/desktop)
  const handleScrollLeftOrUp = () => {
    if (thumbnailContainerRef.current) {
      const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind
      thumbnailContainerRef.current.scrollBy({
        left: isMobile ? -80 : 0,
        top: !isMobile ? -80 : 0,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRightOrDown = () => {
    if (thumbnailContainerRef.current) {
      const isMobile = window.innerWidth < 768; // md breakpoint in Tailwind
      thumbnailContainerRef.current.scrollBy({
        left: isMobile ? 80 : 0,
        top: !isMobile ? 80 : 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-start flex-col md:flex-row gap-4 w-full">
      {/* Thumbnail images with scroll buttons */}
      <div className="relative flex md:flex-col gap-2 items-center w-full md:w-auto">
        {/* Left (mobile) or Up (tablet/desktop) button */}
        {formattedImages.length > 4 && (
          <button
            onClick={handleScrollLeftOrUp}
            className="absolute left-[-10px] md:top-[-10px] md:left-0 z-10 flex justify-center items-center  h-8 w-full bg-gray-800 text-white opacity-60 hover:bg-gray-600 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7" // Left arrow for mobile
                className="md:hidden"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7" // Up arrow for tablet/desktop
                className="hidden md:block"
              />
            </svg>
          </button>
        )}

        <div
          ref={thumbnailContainerRef}
          className="flex md:flex-col gap-2 overflow-x-hidden overflow-y-hidden md:overflow-x-hidden md:overflow-y-hidden max-w-full max-h-[300px] md:max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {formattedImages.length > 0 ? (
            formattedImages.map((img, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentIndex(i);
                }}
                className="flex-shrink-0"
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i}`}
                  width={80}
                  height={80}
                  className={`border-2 transition-all duration-300 ease-in-out cursor-pointer rounded-md object-cover w-20 h-20 min-w-20 min-h-20 md:w-20 md:h-20 md:min-w-20 md:min-h-20 ${
                    selectedImage === img ? "border-green-500 scale-110" : "border-gray-300"
                  }`}
                  onError={(e) => (e.target.src = "/no-image.png")}
                />
              </div>
            ))
          ) : (
            <div className="flex-shrink-0">
              <Image
                src="/no-image.png"
                alt="No image available"
                width={80}
                height={80}
                className="border-2 border-gray-300 rounded-md object-cover w-20 h-20 min-w-20 min-h-20 md:w-20 md:h-20 md:min-w-20 md:min-h-20"
              />
            </div>
          )}
        </div>

        {/* Right (mobile) or Down (tablet/desktop) button */}
        {formattedImages.length > 4 && (
          <button
            onClick={handleScrollRightOrDown}
            className="absolute right-[-10px] md:bottom-[-10px] md:right-0 z-10 flex justify-center items-center w-8 h-8 md:w-full bg-gray-800 text-white opacity-60 hover:bg-gray-600 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7" // Right arrow for mobile
                className="md:hidden"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7" // Down arrow for tablet/desktop
                className="hidden md:block"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Selected main image */}
      <div className="flex-1 flex flex-col justify-center items-center min-h-[300px] relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[400px] h-auto relative"
          >
            {/* Like icon */}
            <i
              className={`text-xl absolute left-[90%] top-4 z-10 cursor-pointer transition-all duration-200 ${
                isFavorited
                  ? "fas fa-heart text-red-500 scale-110"
                  : "far fa-heart text-gray-400 hover:text-red-400"
              }`}
              onClick={toggleFavorite}
            />

            <Image
              src={selectedImage}
              alt="Selected"
              width={400}
              height={100}
              className="rounded-md max-h-[400px] max-w-[600px] bg-gray-300 object-contain w-full"
              onError={(e) => (e.target.src = "/no-image.png")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;