"use client";
import React, { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";

export default function Register({ onClose }) {
  const ref = useRef();
  useOutsideClick(ref, onClose);

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // 1-bosqich: telefon raqamini yuborish
  const handleSendSMS = (e) => {
    e.preventDefault();
    if (phone.length < 9) {
      toast.warning("To'g'ri telefon raqami kiriting");
      return;
    }
    console.log("Telefon raqam yuborildi:", phone);
    // Bu yerda API orqali SMS yuboriladi
    setStep(2);
  };

  // 2-bosqich: SMS kodni tekshirish
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code.length !== 5) {
      toast.error("5 xonali kodni to'g'ri kiriting");
      return;
    }
    console.log("Kod tekshirildi:", code);
    // Bu yerda kodni backendda tekshirish kerak
    setStep(3);
  };

  // 3-bosqich: ism va parol
  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !password) {
      toast.warning("Ism va parolni kiriting ⚠");
      return;
    }
    console.log("Ro'yxatdan o'tdi:", { phone, name, password });
    // API orqali foydalanuvchini ro'yxatdan o'tkazish
    onClose();
  };

  return (
<div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
  <div ref={ref} className="bg-white p-6 rounded-md w-[300px]">
    <h2 className="text-xl font-bold mb-4">Ro&#39;yxatdan o&#39;tish</h2>

    {step === 1 && (
      <form onSubmit={handleSendSMS}>
        <input
          type="number"
          placeholder="Telefon raqami"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          SMS jo&#39;natish
        </button>
      </form>
    )}

    {step === 2 && (
      <form onSubmit={handleVerifyCode}>
        <input
          type="text"
          placeholder="SMS kod (5 xonali)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={5}
          className="w-full p-2 border mb-2 rounded text-center tracking-widest text-[20px]"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Kodni tasdiqlash
        </button>
      </form>
    )}

    {step === 3 && (
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Ro&#39;yxatdan o&#39;tish
        </button>
      </form>
    )}

    <button
      onClick={onClose}
      className="text-sm text-gray-500 mt-3 block mx-auto"
    >
      Yopish
    </button>
  </div>
</div>

  );
}
