"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ProductGallery = ({ images, toggleFavorite, isFavorited }) => {
  // backenddan kelgan rasmni to‘liq URLga o‘girish
  const baseURL = "http://127.0.0.1:5000"; 

  const formattedImages = images.map(
    (img) => `${baseURL}${img.url}` // masalan: "/static/uploads/abc.jpg" → "http://127.0.0.1:5000/static/uploads/abc.jpg"
  );

  const [selectedImage, setSelectedImage] = useState(formattedImages[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnail images */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {formattedImages.map((img, i) => (
          <div key={i} onClick={() => setSelectedImage(img)}>
            <Image
              src={img}
              alt={`Thumbnail ${i}`}
              width={70}
              height={70}
              className={`border-2 transition-all duration-300 ease-in-out cursor-pointer rounded-md ${
                selectedImage === img
                  ? "border-green-500 scale-110"
                  : "border-gray-300"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Selected main image with animation */}
      <div className="flex-1 flex justify-center items-center min-h-[300px] relative">
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
              className="rounded-md max-h-100 max-w-600 bg-gray-300 object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
