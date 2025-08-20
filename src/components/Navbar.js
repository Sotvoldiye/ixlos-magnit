"use client";
import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import Link from "next/link";
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "@/lib/api/productApi";
import CategoriesList from "./CategoriesListX";
import CategoryListY from "./CategoryListY";
import style from "./topNav.module.css";
import Image from "next/image";
import TopNavbarScleton from "./TopNavbarScleton";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data, isLoading, error } = useGetAllCategoriesQuery();
  const { data: productsData, isLoading: prodLoading } = useGetAllProductsQuery();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <TopNavbarScleton />;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data || [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // 🔥 Search natijasiga boshqa sahifaga o'tkazadi
    router.push(`/searchResult?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className={`pt-2 ${style.nav}`}>
      <TopNavbar />
      <div className="md:px-8 flex items-center py-6 w-full mt-2 mb-2 border-y border-gray-300 gap-4">
        <Link href="/">
          <Image width={90} height={60} src="/images/logo234.jpg" alt="logo" />
        </Link>

        {/* Qidiruv formasi */}
        <form onSubmit={handleSearch} className="flex flex-grow items-center gap-4">
          <div
            className={`flex items-center flex-grow border border-black rounded-3xl px-4 py-2 gap-3 ${style.searchingInput}`}
          >
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              className="flex-grow outline-none border-none text-sm"
              type="text"
              placeholder="Maxsulot qidirish"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="border-l border-black pl-3 ml-3">
              {/* CategoryListY ga prop sifatida categories yuboriladi */}
              <CategoryListY categories={categories} />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
          >
            Qidirish
          </button>
        </form>
      </div>

      {/* Kategoriya ro‘yxati */}
      <CategoriesList categories={categories || []} products={productsData || []} />
    </header>
  );
}
