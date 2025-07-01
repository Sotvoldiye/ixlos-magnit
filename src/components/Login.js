"use client";
import React, { useRef, useState, useEffect } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";

export default function Login({ onClose }) {
  const ref = useRef();
  useOutsideClick(ref, onClose);

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // <768px => mobil deb hisoblaymiz
    };
    handleResize(); // birinchi ishga tushganda
    window.addEventListener("resize", handleResize); // oyna o‘zgarsa
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      toast.warning("Iltimos, to‘g‘ri telefon raqamini kiriting.");
      return;
    }
    console.log("SMS yuborildi:", phone);
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code.length !== 5) {
      toast.error("5 xonali kodni kiriting.");
      return;
    }
    console.log("Kiritilgan kod:", code);
    onClose();
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
    className="fixed inset-0 bg-black/20 flex justify-center items-center z-50"
  >
    <motion.div
      ref={ref}
      variants={variants}
      className="bg-white p-6 rounded-md w-[320px] shadow-lg"
    >
        <h2 className="text-xl font-bold mb-4 text-center">Kirish</h2>

        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <PhoneInput
              country={"uz"}
              onlyCountries={["uz"]}
              masks={{ uz: "(..) ...-..-.." }}
              value={phone}
              onChange={setPhone}
              placeholder="Telefon raqamingiz"
              inputStyle={{
                width: "100%",
                height: "45px",
                fontSize: "16px",
                paddingLeft: "50px", // Bu juda muhim: +998 va flag uchun joy
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              containerStyle={{
                width: "100%",
              }}
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded mt-2"
            >
              SMS jo'natish
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <input
              type="number"
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
              Kirish
            </button>
          </form>
        )}

        <button onClick={onClose} className="text-sm text-gray-500 mt-3 block ">
          Yopish
        </button>
      </motion.div>
    </motion.div>
  );
}
