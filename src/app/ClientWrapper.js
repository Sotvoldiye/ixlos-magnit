"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import LayoutWrapper from "@/components/LayoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFavoruteItems } from "@/lib/slice/Slice";
import { usePathname, useRouter } from "next/navigation";

export default function ClientWrapper({ children }) {
  const [isClientReady, setIsClientReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items);

  const pathname = usePathname();
  const router = useRouter();
  const hiddenRoutes = ["/contact", "/privacy", "/terms"];
  const isHiddenRoute = hiddenRoutes.includes(pathname);

  // Splash screen nazorati
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeen) {
      setShowSplash(true);
      sessionStorage.setItem("hasSeenSplash", "true");

      const timer = setTimeout(() => {
        setShowSplash(false);
        setIsClientReady(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsClientReady(true);
    }
  }, []);

  // Redux localStorage bilan sinxronlashtirish
  useEffect(() => {
    const stored = localStorage.getItem("favorite");
    if (stored) {
      dispatch(setFavoruteItems(JSON.parse(stored)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }, [favorites]);

  if (!isClientReady && !showSplash) return null;

  // Splashdan keyin, sahifaga qarab shartli chiqish
  if (showSplash) return <SplashScreen />;

  if (isHiddenRoute) {
    return (
      <div className="p-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Orqaga
        </button>
        <div className="mt-4">{children}</div>
      </div>
    );
  }

  // Oddiy sahifalar uchun LayoutWrapper bilan render
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
