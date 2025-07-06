"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ProductGallery = ({ images, favorites, toggleFavorite, productId }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const isFavorited = favorites?.some((item) => item.id === productId);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnail images */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {images.map((img, i) => (
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
            className="w-full max-w-[500px] h-auto relative"
          >
            {/* Like icon */}
            <i
  onClick={toggleFavorite}
  className={`fa-heart text-2xl absolute right-4 top-4 cursor-pointer transition 
    ${isFavorited ? "fas text-red-600 scale-110" : "far text-gray-400 hover:text-red-400"}`}
/>



            <Image
              src={selectedImage}
              alt="Selected"
              width={500}
              height={500}
              className="rounded-md object-cover w-full h-auto"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductGallery;
