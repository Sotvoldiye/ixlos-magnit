"use client";
import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import Link from "next/link";
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "@/lib/api/productApi";
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


  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // 🔥 Search natijasiga boshqa sahifaga o'tkazadi
    router.push(`/searchResult?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
   <header className="relative md:inline sm:inline lg:inline hidden pt-2 bg-[url('/images/headerimg.jpg')] bg-cover h-35">
  {/* Header fonidagi rasm saqlanadi */}
  <div className="absolute bottom-0 w-full md:px-8 flex items-center py-2 border-gray-300 gap-4">
    <Link href="/">
      <Image width={120} height={60} src="/images/ixlosmagnit.svg" alt="logo" />
    </Link>

    <form onSubmit={handleSearch} className="flex flex-grow items-center gap-4 ">
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
    <button>
<i className="fa-solid fa-magnifying-glass"></i>    </button>

    <TopNavbar />
  </div>
</header>

  );
}