"use client";
import React, { useRef, useState, useEffect } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Login({ onClose, onOpenRegister }) {
  const ref = useRef();
  useOutsideClick(ref, onClose);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.warning("Iltimos, to&#39;g&#39;ri email kiriting.");
      return;
    }

    if (!password || password.length < 6) {
      toast.warning("Parol kamida 6 ta belgidan iborat bo&#39;lishi kerak.");
      return;
    }

    // Simulyatsiya (bu yerda siz API chaqirishingiz mumkin)
    toast.success("Kirish muvaffaqiyatli!");
    onClose(); // modal yopiladi
  };

  const variants = {
    hidden: isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 },
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

        <h2 className="text-xl font-bold mb-4 text-center">Kirish</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Emailingizni kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[45px] text-base rounded border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Parolingizni kiriting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[45px] text-base rounded border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Kirish
          </button>
        </form>

        <div className="text-xs text-center mt-4">
          Hisobingiz yo&#39;qmi?{" "}
          <button
            onClick={onOpenRegister}
            className="text-green-600 underline hover:text-green-800"
          >
            Ro&#39;yxatdan o&#39;tish
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
