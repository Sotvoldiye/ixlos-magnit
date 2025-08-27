"use client";

import useProductCard from "@/hooks/ProductCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBags, removerBags, addBags, removeFavorute } from "@/lib/slice/Slice";
import Link from "next/link";
import Image from "next/image";

const SaralanganPage = () => {
  // Redux'dan favorute olish
  const [orderedItems, setOrderedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("orderedItems") || "[]");
    }
    return [];
  }); 
    const dispatch = useDispatch();
  const favorutes = useSelector((state) => state.favorute.items || []);
  const { itemExistsIn, toggleFavorited, toggleBaged } = useProductCard();
  const favorites = useSelector((state) => state.bags.items || []);
  const BASE_URL = "http://127.0.0.1:5000";
  
  const handleCardRemove = (item) => {
    if (orderedItems.some((ord) => ord.id === item.id)) {
      setShowContactInfoDialog(true);
    } else {
      dispatch(removeFavorute({ id: item.id }));
    }
     
  
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Saralangan mahsulotlar</h2>

      {favorutes.length === 0 ? (
        <p className="text-gray-500">Hozircha saralangan mahsulot yo‘q.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorutes.map((item, index) => {
          const isInFavorites = itemExistsIn(favorites, item);
          const isOrdered = orderedItems.some((ord) => ord.id === item.id);
  const imageUrl =
    item?.images?.length > 0
      ? BASE_URL + item.images[0].url
      : "/no-image.png";

          return(
            <div
              key={item?.id || index} // ✅ Har doim unikal bo‘lishini ta’minladik
              className="relative border rounded-lg shadow hover:shadow-lg transition p-2"
            >
                            <div className="flex flex-col relative w-full rounded-lg transition">
                <div className="relative w-full">
                <div className="flex items-center">
                <i
                    className={`text-md absolute right-2 top-2 z-10 cursor-pointer ${
                      removeFavorute
                        ? "fas fa-cart-shopping text-red-500 scale-110"
                        : "fas fa-cart-shopping text-gray-700 hover:text-red-400"
                    }`}
                    onClick={() => toggleBaged(item)}
                  ></i>
                   
                   <i className={`text-md absolute right-2 top-8 z-10 cursor-pointer ${
                      isInFavorites
                        ? "fas fa-trash text-gray-500 scale-110"
                        : "fas fa-trash text-gray-700"
                    }`}  onClick={() => handleCardRemove(item)}></i>
                </div>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={imageUrl}
                      alt={item?.name}
                      width={300}
                      height={300}
                      className="w-full h-[200px] object-cover rounded-md"
                    />
                  </Link>
                </div>

                <Link href={`/product/${item.id}`}>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1 mt-2">
                    {item?.name}
                  </p>
                  <p className="text-[15px] text-gray-900 font-semibold">
                    {item?.price} so&#39;m
                  </p>
                </Link>
                </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
};

export default SaralanganPage;