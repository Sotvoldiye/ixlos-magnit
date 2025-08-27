"use client";
import React, { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRegisterUserMutation } from "@/lib/api/productApi";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slice/Slice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Register({ onClose, onOpenLogin }) {
  const ref = useRef();
    const router = useRouter();
  
  useOutsideClick(ref, onClose);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.warning("To'g'ri email manzilini kiriting");
      return;
    }

    if (password.length < 6) {
      toast.warning("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Parollar bir xil emas");
      return;
    }

    try {
      const response = await registerUser({ 
        username: name, 
        email, 
        password, 
        phone: number 
      }).unwrap();

      console.log("Register response:", response);

      // Token va user ma'lumotlarini tekshirish
      if (response.access_token && response.user) {
        // Cookie ga saqlash
        Cookies.set("token", response.access_token, { expires: 7 });
        
        // Redux state ga user ma'lumotini yozish
        dispatch(login({ user: response.user }));
        
        toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz");

        if (onClose) onClose();

               router.push("/");
      } else {
        toast.error("Serverdan noto'g'ri javob qaytdi");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Ro&apos;yxatdan o&apos;tish</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          type="text" 
          placeholder="Ismingizni kiriting" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          required
        />
        <input 
          type="email" 
          placeholder="Emailni kiriting" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          required
        />
        <input 
          type="tel" 
          placeholder="Telefon raqamingizni kiriting" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)} 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
        />
        <input 
          type="password" 
          placeholder="Parol yarating" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          required
          minLength={6}
        />
        <input 
          type="password" 
          placeholder="Parolni qayta kiriting" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          required
        />

        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>
      </form>

      <div className="text-xs text-center mt-4">
        Hisobingiz bormi?{" "}
        <button onClick={onOpenLogin} className="text-green-600 underline hover:text-green-800">
          Kirish
        </button>
      </div>
    </div>
  );
}