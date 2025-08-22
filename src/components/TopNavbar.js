"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./topNav.module.css";
import Link from "next/link";
import { logout } from "@/lib/slice/Slice";
import { useRouter } from "next/navigation";

export default function TopNavbar() {
  const user = useSelector((state) => state.user.user);
  const favoriteCount = useSelector((state) => state.favorute.items.length);
  const bagCount = useSelector((state) => state.bags.items.length);
  const [avatarColor, setAvatarColor] = useState("#ccc"); // default rang
  const dispatch = useDispatch();
  const router = useRouter();

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

  return (
    <div className={`md:px-8 flex items-center gap-6 ${style.nav}`}>
      {/* Avatar va User */}
      <div>
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
          <div
            className=" text-[14px] flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/Auth")}  // 🔥 sahifaga o‘tadi
          >
            <i className="fas fa-user fa-xl"/> <p>Kirish</p>
          </div>
        )}
      </div>

      {/* Saralangan va Saqlangan */}
      <div className="flex gap-6 items-center text-[14px]">
        <Link href="/saralangan" className="relative text-gray-700 hover:text-black">
          <i className="fa-solid fa-heart fa-xl"></i>
          {favoriteCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {favoriteCount}
            </span>
          )}
        </Link>

        <Link href="/saqlangan" className="flex items-center gap-1 text-gray-700 hover:text-black">
          <div className="relative">
            <i className="fa-solid fa-shopping-cart fa-xl"></i>
            {bagCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {bagCount}
              </span>
            )}
          </div>
          <p className="inline">Savat</p>
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
    </div>
  );
}
