'use client';

import React from "react";
import TopNavbar from "./TopNavbar";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import { useParams, useRouter } from "next/navigation";
import CategoriesList from "./CategoriesListX";
import CategoryListY from "./CategoryListY";
import style from "./topNav.module.css"
import TopNavbarScleton from "./TopNavbarScleton";
export default function Navbar() {
  const { data, isLoading, error } = useGetAllProductsQuery();


  if (isLoading) return <div><TopNavbarScleton/></div>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = [...new Set(data.products.map((p) => p.category))];

  return (
    <header className={`pt-2 ${style.nav}`}>
      <TopNavbar />

      {/* Main Navbar */}
      <div className="md:px-8 flex items-center py-6 w-full mt-2 mb-2 border-y border-gray-300 gap-4">
        <Link href="/">
          <h1 className="text-[26px] font-semibold whitespace-nowrap">
            <span className="text-green-500">Ixlos</span>-Magnit
          </h1>
        </Link>

        <form className="flex  flex-grow items-center gap-4">
          <div className={`flex items-center flex-grow border border-black rounded-3xl px-4 py-2 gap-3 ${style.searchingInput}`}>
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              className="flex-grow outline-none border-none text-sm"
              type="text"
              placeholder="Maxsulot qidirish"
            />

            <div className="border-l border-black pl-3 ml-3">
            <CategoryListY categories={categories}/>
            </div>
          </div>

          <button className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition">
            Qidirish
          </button>
        </form>
      </div>
      
       <CategoriesList categories={categories}/>            

    </header>
  );
}
