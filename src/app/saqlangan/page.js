"use client";
import { addBags, addFavorute, removeFavorute, removerBags, setBags } from "@/lib/slice/Slice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBullseye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function BagsPage() {
  const dispatch = useDispatch();
  const bags = useSelector((state) => state.bags.items);
  const favorites = useSelector((state) => state.favorute.items);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bags");
    if (stored) {
      dispatch(setBags(JSON.parse(stored)));
    }
    setHydrated(true); // 🛠️ Bu MUHIM
  }, [dispatch]);

  if (!hydrated) return <p>Yuklanmoqda...</p>;

  if (bags.length === 0) {
    return <p>Saqlangan mahsulotlar yo&#39;q</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4 py-6">
      {bags.map((item) => {
        const isInBags = bags.some((i) => i.id === item.id);

        const toggleBag = (e) => {
          e.preventDefault();
          if (isInBags) {
            dispatch(removerBags({ id: item.id }));
          } else {
            dispatch(addBags(item));
          }
        };

        const isFavorited = favorites.some((fav) => fav.id === item.id);
        
              const toggleFavorite = (e) => {
                e.preventDefault();
                if (isFavorited) {
                  dispatch(removeFavorute({ id: item.id }));
                } else {
                  dispatch(addFavorute(item));
                }
              };

        return (
          <div
          key={item.id}
          className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition px-2 py-2"
        >
         <div className="fle x p-o flex-col relative w-full rounded-lg transition">
          <div className="relative w-full">
            {/* Favorite icon */}
            <i
              className={`text-xl absolute right-2 z-10 cursor-pointer 
                ${
                isFavorited
                  ? "fas fa-heart text-red-500 scale-110"
                  : "far fa-heart text-gray-700 hover:text-red-400"
              }`}
            
              onClick={toggleFavorite}
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
            <p className="text-sm font-medium text-gray-800 line-clamp-1">{item?.title}</p>
            <p className="text-[15px] text-gray-900 font-semibold">{item?.price} so&#39;m</p>
          </Link>
    
          {/* Ellipsis va modal */}
          <div className="relative self-end">
          <i
          className={`fa-solid fa-cart-shopping text-[18px] text-gray-700 hover:bg-gray-200 py-[5px] px-[10px] rounded-full cursor-pointer transition ${
            isInBags  ? "bg-gray-300 scale-110" : ""
          }`}
          onClick={toggleBag}
        />
          </div>
        </div>
          </div>
        );
      })}
    </div>
  );
}
