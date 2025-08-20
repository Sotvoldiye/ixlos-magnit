"use client";

import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";
import style from "./topNav.module.css";
import Link from "next/link";
import { logout } from "@/lib/slice/Slice";

export default function TopNavbar() {
  const user = useSelector((state) => state.user.user);
  const favoriteCount = useSelector((state) => state.favorute.items.length);
  const bagCount = useSelector((state) => state.bags.items.length);
  const [modalType, setModalType] = useState(null);
  const [avatarColor, setAvatarColor] = useState("#ccc"); // default rang
  const dispatch = useDispatch();

  // Random rang yaratish funksiyasi
  const getRandomColor = () => {
    const colors = ["#f87171","#60a5fa","#34d399","#fbbf24","#a78bfa","#f472b6","#f97316"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Avatar rangini olish yoki yaratish
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

  // Logout qilganda rang va user o‘chadi
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("avatarColor");
  };

  // Foydalanuvchi ismining birinchi harfini olish
  const firstLetter = user?.user?.charAt(0).toUpperCase() || "";
console.log(user)
  return (
    <div className={`md:px-8 flex justify-between items-center ${style.nav} py-3`}>
      {/* Avatar va User */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: avatarColor }}
            >
              {firstLetter}
            </div>
            <span className="font-medium">{user.user}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[14px]">
            <p
              onClick={() => setModalType("login")}
              className="underline text-green-600 cursor-pointer"
            >
              Kirish
            </p>
            <span> yoki </span>
            <p
              onClick={() => setModalType("register")}
              className="underline text-green-600 cursor-pointer"
            >
              Ro’yxatdan o’tish
            </p>
          </div>
        )}
      </div>

      {/* Saralangan va Saqlangan */}
      <div className="flex gap-4 items-center text-[14px]">
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

        {/* Logout */}
        {user && (
          <i
            className="fa-solid fa-right-from-bracket text-red-500 cursor-pointer ml-3"
            title="Chiqish"
            onClick={handleLogout}
          ></i>
        )}
      </div>

      {/* Modallar */}
      {modalType === "login" && (
        <Login onClose={() => setModalType(null)} onOpenRegister={() => setModalType("register")} />
      )}
      {modalType === "register" && (
        <Register onClose={() => setModalType(null)} onOpenLogin={() => setModalType("login")} />
      )}
    </div>
  );
}
