"use client";
import Image from "next/image";
import Link from "next/link";
import { getProductCardState } from "@/hooks/getProductCardState";
import useProductCard from "@/hooks/ProductCard";

export default function SaralanganPage() {
  const { favorites, bags, toggleFavorited, toggleBaged } = useProductCard();

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Saralangan Mahsulotlar</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bags.map((item) => {
          const {
            isFavorited,
            isInBags,
            toggleFavorited: handleToggleFavorited,
            toggleBaged: handleToggleBaged,
          } = getProductCardState(item, favorites, bags, toggleFavorited, toggleBaged);

          return (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-[1.02]"
            >
              {/* Favorite icon */}
              <i
                className={`text-xl absolute top-3 right-3 z-10 cursor-pointer transition ${
                  isFavorited
                    ? "fas fa-heart text-red-500 scale-110"
                    : "far fa-heart text-gray-500 hover:text-red-400"
                }`}
                onClick={handleToggleFavorited}
              ></i>

              {/* Mahsulot rasmi */}
              <Link href={`/product/${item.id}`}>
                <Image
                  src={item?.thumbnail}
                  alt={item?.title}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
              </Link>

              {/* Mahsulot ma'lumotlari */}
              <div className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item?.title}</h3>
                </Link>
                <p className="text-base text-gray-900 font-bold mt-1">
                  {item?.price} so&#39;m
                </p>

                {/* Savatcha tugmasi */}
                <div className="mt-4 flex justify-end">
                  <i
                    className={`fa-solid fa-cart-shopping text-[20px] transition-all cursor-pointer px-3 py-2 rounded-full ${
                      isInBags
                        ? "bg-green-100 text-green-700 scale-110"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={handleToggleBaged}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
