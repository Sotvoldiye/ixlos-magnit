"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import useProductCard from "@/hooks/ProductCard";
import getTop10DailyDeals from "@/hooks/DailyDeals_Functions";

export default function DailyDeals() {
  const { data, isLoading, error } = useGetAllProductsQuery();

  const {
    favorites,
    bags,
    itemExistsIns,
    toggleFavorited,
    toggleBaged,
  } = useProductCard(); 

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;
  if (!data?.products?.length) return <p>Mahsulotlar topilmadi</p>;

  const top10ByDiscountPercentage = getTop10DailyDeals(data.products);

  if (!top10ByDiscountPercentage.length)
    return <p>Eng so‘nggi kun uchun mahsulot topilmadi</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 p-6">
   {top10ByDiscountPercentage.map((product) => {
  return (
    <div
      key={product.id}
      className="relative rounded-lg p-4 border border-gray-300 hover:shadow-lg transition group"
    >
      {/* Like icon */}
      <i
        className={`text-xl absolute right-2 z-10 cursor-pointer ${
          itemExistsIns(favorites, product)
            ? "fas fa-heart text-red-500 scale-110"
            : "far fa-heart text-gray-700 hover:text-red-400"
        }`}
        onClick={() => toggleFavorited(product)}
      ></i>

      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className="rounded-md w-full h-[200px] object-cover"
        />
      </Link>

      {/* Product info */}
      <div className="mt-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-[15px] text-gray-800 line-clamp-1">
            {product.title}
          </h3>
          <div className="text-[15px] text-gray-900 font-semibold">
            {(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}{" "}
            so‘m
          </div>
          <div className="text-sm line-through text-gray-500">
            {product.price.toFixed(2)} so‘m
          </div>
        </Link>
      </div>

      {/* Cart icon */}
      <i
        className={`fa-solid fa-cart-shopping text-[18px] text-gray-700 hover:bg-gray-200 py-[5px] px-[10px] rounded-full cursor-pointer transition ${
          itemExistsIns(bags, product) ? "bg-gray-300 scale-110" : ""
        }`}
        onClick={() => toggleBaged(product)}
      />
    </div>
  );
})}

    </div>
  );
}
