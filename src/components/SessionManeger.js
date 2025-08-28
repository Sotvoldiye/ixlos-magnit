"use client";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout } from "@/lib/slice/Slice";
import { toast } from "react-toastify";

export default function SessionManager() {
  const dispatch = useDispatch();
  const router = useRouter();
  const hasShownToast = useRef(false); // Komponent ichida qayta render uchun

  useEffect(() => {
    // localStorage dan xabar chiqib-chiqmaganligini tekshirish
    const hasShownSessionExpired = localStorage.getItem("sessionExpiredToast") === "true";

    if (hasShownSessionExpired) {
      // Agar xabar allaqachon chiqqan bo‘lsa, hech narsa qilmaymiz
      return;
    }

    const checkTokenExpiration = setInterval(() => {
      const token = Cookies.get("token");
      if (!token && !hasShownToast.current) {
        dispatch(logout());
       
        hasShownToast.current = true; // Komponent ichida qayta chiqmaslik uchun
        localStorage.setItem("sessionExpiredToast", "true"); // Global bir marta chiqish uchun
        router.push("/Auth");
      }
    }, 10000); // Har 10 soniyada tekshirish (3 soatlik muddat uchun)

    return () => clearInterval(checkTokenExpiration);
  }, [dispatch, router]);

  return null;
}