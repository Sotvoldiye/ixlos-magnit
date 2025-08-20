"use client";

import React, { useState, useEffect } from "react";
import TopNavbar from "./TopNavbar";
import Link from "next/link";
import Image from "next/image"; // ✅ Next.js image
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "@/lib/api/productApi";
import CategoriesList from "./CategoriesListX";
import SheetMobile from "./Sheet";
import Login from "./Login";
import style from "./topNav.module.css";
import { useSelector } from "react-redux";

export default function MobileNavbar() {
  const { data: productsData, isLoading: productsLoading, error: productsError } = useGetAllProductsQuery();
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetAllCategoriesQuery();

  const [login, setLogin] = useState(false);

  const categorie = categoriesData || [];
  if (!Array.isArray(categorie)) return null;

  const user = useSelector((state) => state.user.user);
  const favoriteCount = useSelector((state) => state.favorite?.items?.length || 0); // ✅ to‘g‘rilandi
  const bagCount = useSelector((state) => state.bag?.items?.length || 0); // ✅ to‘g‘rilandi

  // avatar rang
  const [avatarColor, setAvatarColor] = useState("#ccc");

  const getRandomColor = () => {
    const colors = [
      "#f87171",
      "#60a5fa",
      "#34d399",
      "#fbbf24",
      "#a78bfa",
      "#f472b6",
      "#f97316",
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

  if (productsLoading || categoriesLoading) return <div className={style.mobileNav}></div>;
  if (productsError) return <p>Error: {productsError.message}</p>; // ✅ to‘g‘rilandi
  if (categoriesError) return <p>Error: {categoriesError.message}</p>;

  const categories = [...new Set(productsData?.products?.map((p) => p.category) || [])];

  const firstLetter = user?.user?.charAt(0).toUpperCase() || "";

  return (
    <header className={`pt-2 ${style.mobileNav}`}>
      <TopNavbar />
      <div className="md:px-8 flex flex-col items-start w-[calc(100% -2rem)] mt-2 mx-2 mb-2 gap-4">
        <div className="flex items-center justify-between w-[calc(100%-1rem)] mx-2">
          <Link href="/">
            <Image src="/images/logo234.jpg" alt="logo" width={90} height={40} /> 
          </Link>
          <div className="flex gap-3 items-center">
            {user ? (
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold cursor-pointer"
                style={{ backgroundColor: avatarColor }}
              >
                {firstLetter}
              </div>
            ) : (
              <i
                onClick={() => setLogin(true)}
                className="fa-solid fa-user cursor-pointer"
              ></i>
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

            {/* Bag */}
            <Link href="/saqlangan" className="relative text-gray-700 hover:text-black">
              <i className="fa-solid fa-shopping-cart"></i>
              {bagCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {bagCount}
                </span>
              )}
            </Link>

            <SheetMobile categorie={categorie} />
          </div>
        </div>

        {/* Search input */}
        <form className="flex w-full items-center gap-4">
          <div
            className={`flex w-full border border-black rounded-3xl px-4 py-2 gap-3 ${style.searchingInput}`}
          >
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              className="flex-grow outline-none border-none text-sm"
              type="text"
              placeholder="Maxsulot qidirish"
            />
          </div>
        </form>

        {login && <Login onClose={() => setLogin(false)} />}
      </div>

      <CategoriesList categories={categorie} />
    </header>
  );
}
