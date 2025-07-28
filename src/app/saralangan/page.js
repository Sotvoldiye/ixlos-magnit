"use client";
import Image from "next/image";
import Link from "next/link";
import { useProductCard } from "@/hooks/useProductCard"; // hook umumiy state boshqaruvi uchun
import { getProductCardState } from "@/hooks/getProductCardState";

export default function SaralanganPage() {
  const {
    favorites,
    bags,
    toggleFavorited,
    toggleBaged,
  } = useProductCard(); // ✅ Hook faqat komponent darajasida ishlatilgan

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
            className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition px-2 py-2"
          >
            <div className="flex flex-col relative w-full rounded-lg transition">
              <div className="relative w-full">
                {/* Favorite icon */}
                <i
                  className={`text-xl absolute right-2 z-10 cursor-pointer 
                    ${
                      isFavorited
                        ? "fas fa-heart text-red-500 scale-110"
                        : "far fa-heart text-gray-700 hover:text-red-400"
                    }`}
                  onClick={handleToggleFavorited}
                ></i>

                {/* Rasm */}
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

              {/* Mahsulot nomi va narxi */}
              <Link href={`/product/${item.id}`}>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {item?.title}
                </p>
                <p className="text-[15px] text-gray-900 font-semibold">
                  {item?.price} so&#39;m
                </p>
              </Link>

              {/* Savatcha */}
              <div className="relative self-end">
                <i
                  className={`fa-solid fa-cart-shopping text-[18px] text-gray-700 hover:bg-gray-200 py-[5px] px-[10px] rounded-full cursor-pointer transition ${
                    isInBags ? "bg-gray-300 scale-110" : ""
                  }`}
                  onClick={handleToggleBaged}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
