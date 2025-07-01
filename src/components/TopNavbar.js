"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./topNav.module.css";
import Login from "./Login";
import Register from "./Register";

export default function TopNavbar() {
  const favoriteCount = useSelector((state) => state.favorute.items.length);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <div className={`md:px-8 flex justify-between ${style.nav}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[12px]">
          <p>Salom</p>
          <p
            onClick={() => setLogin(true)}
            className="text-[12px] underline text-blue-600 cursor-pointer inline"
          >
            Kirish
          </p>
          <span> yoki </span>
          <p
            onClick={() => setRegister(true)}
            className="text-[12px] underline text-blue-600 cursor-pointer inline"
          >
            Ro&apos;yxatdan o&apos;tish
          </p>
        </div>

        <div className="flex items-center gap-2 text-[12px]">
          <Link href="/dailyDeals">Kunlik aksiyalar</Link>
          <Link href="#">Qo&apos;llab-quvvatlash / Aloqa</Link>
        </div>
      </div>

      <div className="flex gap-3 items-center text-[14px]">
        <div  onClick={() => setLogin(true)}> Kirish <i className="fa-regular fa-user"></i>
        </div>
        <Link href="/saralangan" className="relative">
          Saralangan <i className="fa-solid fa-heart"></i>
          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {favoriteCount}
            </span>
          )}
        </Link>
        Savat <i className="fas fa-shopping-cart"></i>
      </div>

      {login && <Login onClose={() => setLogin(false)} />}
      {register && <Register onClose={() => setRegister(false)} />}
    </div>
  );
}
