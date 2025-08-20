'use client';

import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import Link from 'next/link';
import { useGetAllProductsQuery } from '@/lib/api/productApi';
import CategoriesList from './CategoriesListX';
import SheetMobile from './Sheet';
import Login from './Login';
import style from './topNav.module.css';

export default function MobileNavbar() {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [login, setLogin] = useState(false);

  if (isLoading) return <div className={style.mobileNav}></div>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = [...new Set(data?.products?.map((p) => p.category) || [])];

  return (
    <header className={`pt-2 ${style.mobileNav}`}>
      <TopNavbar />
      <div className="md:px-8 flex flex-col items-start w-[calc(100% -2rem)] mt-2 mx-2 mb-2 gap-4">
        <div className="flex items-center justify-between w-[calc(100%-1rem)] mx-2">
          <Link href="/">
            <h1 className="text-[26px] font-semibold whitespace-nowrap">
              <span className="text-green-500">Ixlos</span>-Magnit
            </h1>
          </Link>
          <div className="flex gap-3 items-center">
            <i onClick={() => setLogin(true)} className="fa-solid fa-user"></i>
            <i className="fas fa-shopping-cart"></i>
            <SheetMobile />
          </div>
        </div>

        <form className="flex w-full items-center gap-4">
          <div className={`flex w-full border border-black rounded-3xl px-4 py-2 gap-3 ${style.searchingInput}`}>
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input className="flex-grow outline-none border-none text-sm" type="text" placeholder="Maxsulot qidirish" />
          </div>
        </form>

        {login && <Login onClose={() => setLogin(false)} />}

      </div>

      <CategoriesList categories={categories} />
    </header>
  );
}
