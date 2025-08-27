"use client";
import React, { useRef, useState, useEffect } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slice/Slice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/api/productApi"; // ✅ RTK query login
import { ClipLoader } from "react-spinners"; // optional loading spinner

export default function Login({ onClose, onOpenRegister }) {
  const ref = useRef();
  useOutsideClick(ref, onClose);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginMutation(); // ✅ RTK query hook
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warning("Foydalanuvchi nomi va parolni kiriting");
      return;
    }

    try {
      const data = await loginUser({ username, password }).unwrap();

      if (data.access_token && data.user) {
        // Cookie ga tokenni yozamiz
        Cookies.set("token", data.access_token, { expires: 7 });

        // Redux user slice'ga yozamiz
        dispatch(login({ user: data.user }));

        toast.success("Kirish muvaffaqiyatli!");
        if (onClose) onClose();

        // Router bilan boshqa sahifaga yuborish (masalan account yoki home)
        router.push("/");
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

      <div className="text-xs text-center mt-4">
        Hisobingiz yo&apos;qmi?{" "}
        <button
          onClick={onOpenRegister}
          className="text-green-600 underline hover:text-green-800"
        >
          Ro&apos;yxatdan o&apos;tish
        </button>
      </div>
    </div>
  );
}
