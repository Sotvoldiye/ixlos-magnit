"use client";
import React, { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRegisterUserMutation } from "@/lib/api/productApi";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slice/Slice"; // Redux action
import Cookies from "js-cookie";

export default function Register({ onClose, onOpenLogin }) {
  const ref = useRef();
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
      const response = await registerUser({ username: name, email, password, number }).unwrap();

      // Serverdan tokenni oling
      const token = response.token; // misol uchun server JWT token qaytaradi

      // Cookie ga saqlash (7 kun)
      Cookies.set("token", token, { expires: 7 });

      // Redux state ga user ma’lumotini yozish
      dispatch(login({ user: name }));
console.log(name)
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    }
  };

  const variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      <motion.div
        ref={ref}
        variants={variants}
        className="bg-white p-6 rounded-md w-[320px] max-h-[90vh] overflow-y-auto shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 text-xl hover:text-black"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Ro'yxatdan o'tish</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="Ismingizni kiriting" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="Emailni kiriting" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="number" placeholder="Telefon raqamingizni kiriting" value={number} onChange={(e) => setNumber(e.target.value)} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="password" placeholder="Parol yarating" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="password" placeholder="Parolni qayta kiriting" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />

          <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50">
            {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="text-xs text-center mt-4">
          Hisobingiz bormi?{" "}
          <button onClick={onOpenLogin} className="text-green-600 underline hover:text-green-800">
            Kirish
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
