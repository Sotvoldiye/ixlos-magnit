"use client";
import { addFavorute, removeFavorute } from "@/lib/slice/Slice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Help_Report from "./Help&Report";

export default function Cards({ item }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items);

  // Mahsulot favoritda bor-yo‘qligini tekshir
  const isFavorited = favorites.some((fav) => fav.id === item.id);

  const [helpReport, setHelpReport] = useState(false);
  const ellipsisRef = useRef(null);
  const helpRef = useRef(null);

  // Tashqariga click bo‘lsa, modalni yop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        helpReport &&
        helpRef.current &&
        !helpRef.current.contains(event.target) &&
        ellipsisRef.current &&
        !ellipsisRef.current.contains(event.target)
      ) {
        setHelpReport(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [helpReport]);

  const toggleHelp = (e) => {
    e.preventDefault();
    setHelpReport((prev) => !prev);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorited) {
      dispatch(removeFavorute({ id: item.id }));
    } else {
      dispatch(addFavorute(item));
    }
  };

  return (
    <div className="flex p-o flex-col relative w-full rounded-lg transition">
      <div className="relative w-full">
        {/* Favorite icon */}
        <i
          className={`text-xl absolute right-2 z-10 cursor-pointer ${
            isFavorited
              ? "fas fa-heart text-red-500 scale-110"
              : "far fa-heart text-gray-700 hover:text-red-400"
          }`}
          onClick={toggleFavorite}
        ></i>

        {/* Rasm */}
        <Link href={`/product/${item.id}`}>
          <img
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
        <p className="text-[15px] text-gray-900 font-semibold">{item?.price} so'm</p>
      </Link>

      {/* Ellipsis va modal */}
      <div className="relative self-end">


        <i
          ref={ellipsisRef}
          onClick={toggleHelp}
          className="fa-solid fa-cart-shopping text-[18px] text-gray-700 hover:bg-gray-200 py-[5px] px-[10px] rounded-full cursor-pointer transition"
        ></i>
      </div>
    </div>
  );
}
