"use client";
import useProductCard from "@/hooks/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Cards({ item }) {
  const {
    favorites,
    bags,
    itemExistsIn,
    toggleFavorite,
    toggleBags,
  } = useProductCard(item);

  return (
    <div className="flex p-o flex-col relative w-full rounded-lg transition">
      <div className="relative w-full">
        <i
          className={`text-xl absolute right-2 z-10 cursor-pointer ${
            itemExistsIn(favorites)
              ? "fas fa-heart text-red-500 scale-110"
              : "far fa-heart text-gray-700 hover:text-red-400"
          }`}
          onClick={toggleFavorite}
        ></i>

        <Link href={`/product/${item.id}`}>
          <Image
            src={item?.thumbnail}
            alt={item?.title}
            width={300}
            height={300}
            className="w-full h-[200px] object-cover rounded-md"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <Link href={`/product/${item.id}`}>
          <p className="text-sm font-medium text-gray-800 line-clamp-1">
            {item?.title}
          </p>
          <p className="text-[15px] text-gray-900 font-semibold">
            {item?.price} so&apos;m
          </p>
        </Link>

        <i
          className={`fa-solid fa-cart-shopping text-[18px] text-gray-700 hover:bg-gray-200 py-[5px] px-[10px] rounded-full cursor-pointer transition ${
            itemExistsIn(bags) ? "bg-gray-300 scale-110" : ""
          }`}
          onClick={toggleBags}
        />
      </div>
    </div>
  );
}
