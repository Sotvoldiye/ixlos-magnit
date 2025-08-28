"use client";

import React, { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import Link from "next/link";
import Image from "next/image"; 
import { useGetAllSubcategoriesQuery, useGetAllProductsQuery } from "@/lib/api/productApi";
import SheetMobile from "./Sheet";
import Login from "./Login";
import style from "./topNav.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Auth from "@/app/Auth/page";

export default function MobileNavbar() {
  // 🔹 API hooklar har doim yuqorida
  const { data: productsData, isLoading: productsLoading, error: productsError } = useGetAllProductsQuery();
  const { data: subcategoriesData, isLoading: subcategoriesLoading, error: subcategoriesError } = useGetAllSubcategoriesQuery();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [login, setLogin] = useState(false);

  // 🔹 Redux hooklar ham yuqorida
  const user = useSelector((state) => state.user);
  const favoriteCount = useSelector((state) => state.favorute?.items?.length || 0);
  const bagCount = useSelector((state) => state.bags?.items?.length || 0);

  // 🔹 Avatar rang
  const [avatarColor, setAvatarColor] = useState("#ccc");

  const getRandomColor = () => {
    const colors = [
      "#f87171", "#60a5fa", "#34d399", "#fbbf24",
      "#a78bfa", "#f472b6", "#f97316",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("avatarColor");
    if (savedColor) {
      setAvatarColor(savedColor);
    } else if (user) {
      const color = getRandomColor();
      setAvatarColor(color);
      localStorage.setItem("avatarColor", color);
    }
  }, [user]);

  // 🔹 Loading/Error holatlarini faqat return da ishlatamiz
  if (productsLoading || subcategoriesLoading) {
    return <div className={style.mobileNav}></div>;
  }
  if (productsError) {
    return <p>Xato: {productsError.message}</p>;
  }
  if (subcategoriesError) {
    return <p>Xato: {subcategoriesError.message}</p>;
  }

  // 🔹 Ma’lumotlar transformatsiyasi
  const subcategories = Array.isArray(subcategoriesData) ? subcategoriesData : [];
  const usreArr = user?.user;
  const namearr = usreArr?.user;
  const firstLetter = namearr?.username?.charAt(0)?.toUpperCase() || '';
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // 🔥 Search natijasiga boshqa sahifaga o'tkazadi
    router.push(`/searchResult?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className={`pt-2 ${style.mobileNav} bg-[url('/images/headerimg.jpg')] bg-cover h-35`}>
      <TopNavbar />
      <div className="md:px-8 flex flex-col items-start w-[calc(100% -2rem)] mt-2 mx-2 mb-2 gap-4">
        <div className="flex items-center justify-between w-[calc(100%-1rem)] mx-2">
          <Link href="/">
            <Image src="/images/ixlosmagnit.svg" alt="logo" width={140} height={40} />
          </Link>
          <div className="flex gap-3 items-center">
            {usreArr ? (
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold cursor-pointer"
                style={{ backgroundColor: avatarColor }}
              >
                {firstLetter}
              </div>
            ) : (
             <Link href="/Auth" >
              <i
                className="fa-solid fa-user cursor-pointer"
              ></i>
              </Link>
            )}

            {/* Favorite */}
            <Link href="/saralangan" className="relative text-gray-700 hover:text-black">
              <i className="fa-solid fa-heart"></i>
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <Link href="/saqlangan" className="relative text-gray-700 hover:text-black">
              <i className="fa-solid fa-shopping-cart"></i>
              {bagCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {bagCount}
                </span>
              )}
            </Link>

            <SheetMobile subcategories={subcategories} />
          </div>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex w-full items-center gap-4">
          <div className="flex items-center flex-grow border border-black rounded-sm pl-4 gap-3 bg-white">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              className="flex-grow outline-none border-none text-sm"
              type="text"
              placeholder="Maxsulot qidirish"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-sm bg-green-500 text-white hover:bg-green-600 transition"
            >
              Qidirish
            </button>
          </div>
        </form>

        {login && <Auth />}
      </div>
    </header>
  );
}