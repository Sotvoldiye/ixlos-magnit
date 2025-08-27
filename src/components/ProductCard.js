"use client";

import useProductCard from "@/hooks/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function Cards({ product }) {
  console.log("Product in Cards:", product);
  const {
    favorites,
    bags,
    itemExistsIn,
    toggleFavorite,
    toggleBags,
  } = useProductCard(product);
  // API bazaviy URL
  const BASE_URL = "http://127.0.0.1:5000";

  // rasm URL ni yasash
  const imageUrl =
    product?.images?.length > 0
      ? BASE_URL + product.images[0].url
      : "/no-image.png";

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

        <Link href={`/product/${product.id}`}>
          <Image
            src={imageUrl}
            alt={product?.name ||"Maxsulot"}
            width={300}
            height={300}
            className="w-full h-[200px] object-cover rounded-md"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <Link href={`/product/${product.id}`}>
          <p className="text-sm font-medium text-gray-800 line-clamp-1">
            {product?.name}
          </p>
          <p className="text-[15px] text-gray-900 font-semibold">
            {product?.price} so&apos;m
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