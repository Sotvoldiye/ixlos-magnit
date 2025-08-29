"use client";
import React, { useRef, useState, useEffect } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, logout } from "@/lib/slice/Slice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/api/productApi";
import { ClipLoader } from "react-spinners";

export default function Login({ onClose, onSuccess }) {
  const ref = useRef();
  useOutsideClick(ref, onClose);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const setTokenWithSeconds = (token, seconds) => {
    const expiryDate = new Date(new Date().getTime() + seconds * 1000);
    Cookies.set("token", token, {
      expires: expiryDate,
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
  };

  // Token muddatini kuzatish
  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      const token = Cookies.get("token");
      if (!token) {
        dispatch(logout()); // Redux state'dan foydalanuvchini o'chirish
        router.push("/Auth"); // Auth sahifasiga yo'naltirish
      }
    }, 5000); // Har 5 soniyada tekshirish

    return () => clearInterval(checkTokenExpiration); // Komponent unmount bo'lganda intervalni tozalash
  }, [dispatch, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warning("Foydalanuvchi nomi va parolni kiriting");
      return;
    }

    try {
      const data = await loginUser({ username, password }).unwrap();

      if (data.access_token && data.user) {
        setTokenWithSeconds(data.access_token, 10800); // 3 soat (10800 soniya)
        dispatch(login({ user: data.user }));
        localStorage.removeItem("sessionExpiredToast"); // Yangi sessiya uchun xabarni tiklash

        toast.success("Kirish muvaffaqiyatli!");
        if (onClose) onClose();
      if (onSuccess) onSuccess(); // ✅ onSuccess chaqiramiz

        const redirectPath = Cookies.get("redirectAfterLogin") || "/";
        router.push(redirectPath);
        Cookies.remove("redirectAfterLogin");
      } else {
        throw new Error("Server noto‘g‘ri javob qaytardi");
      }
    } catch (err) {
      console.error("Login xatosi:", err);
      toast.error(err?.data?.message || err.message || "Server bilan xatolik");
    }
  };

  return (
    <div ref={ref}>
      <h2 className="text-xl font-bold mb-4 text-center">Kirish</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Foydalanuvchi nomi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[45px] text-base rounded border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="password"
          placeholder="Parolingizni kiriting"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[45px] text-base rounded border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50 flex justify-center items-center"
        >
          {isLoading ? <ClipLoader size={20} color="#fff" /> : "Kirish"}
        </button>
      </form>


    </div>
  );
}