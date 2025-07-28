"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./topNav.module.css";
import Login from "./Login";
import Register from "./Register";

export default function TopNavbar() {
  const favoriteCount = useSelector((state) => state.favorute.items.length);
  const bagCount = useSelector((state) => state.bags.items.length);
  const [modalType, setModalType] = useState(null); // null, "login", "register"

  return (
    <div className={`md:px-8 flex justify-between ${style.nav}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[12px]">
          <p>Salom</p>
          <p
            onClick={() => setModalType("login")}
            className="text-[12px] underline text-green-600 cursor-pointer inline"
          >
            Kirish
          </p>
          <span> yoki </span>
          <p
            onClick={() => setModalType("register")}
            className="text-[12px] underline text-green-600 cursor-pointer inline"
          >
            Ro'yxatdan o'tish
          </p>
        </div>

        <div className="flex items-center gap-2 text-[12px] ml-1">
          <Link href="/dailyDeals">Kunlik aksiyalar</Link>
        </div>
      </div>

      <div className="flex gap-3 items-center text-[14px]">
        <div onClick={() => setModalType("login")}>
          Kirish <i className="fa-regular fa-user"></i>
        </div>
        <Link href="/saralangan" className="relative">
          Saralangan <i className="fa-solid fa-heart"></i>
          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {favoriteCount}
            </span>
          )}
        </Link>
        <Link href="/saqlangan" className="relative">
          Savat <i className="fa-solid fa-shopping-cart"></i>
          {bagCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {bagCount}
            </span>
          )}
        </Link>
      </div>

      {modalType === "login" && (
        <Login
          onClose={() => setModalType(null)}
          onOpenRegister={() => setModalType("register")}
        />
      )}

      {modalType === "register" && (
        <Register
          onClose={() => setModalType(null)}
          onOpenLogin={() => setModalType("login")}
        />
      )}
    </div>
  );
}
