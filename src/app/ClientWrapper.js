"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import { useDispatch, useSelector } from "react-redux";
import { setFavoruteItems } from "@/lib/slice/Slice";
import { usePathname } from "next/navigation";

export default function ClientWrapper({ children }) {
  const [isClientReady, setIsClientReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items);
  const pathname = usePathname();

  // Splash Screen
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenSplash");
    if (hasSeen) {
      setIsClientReady(true);
      return;
    }

    setShowSplash(true);
    const timer = setTimeout(() => {
      setShowSplash(false);
      setIsClientReady(true);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 3000); // 5 soniya

    return () => clearTimeout(timer);
  }, []);

  // LocalStorage sync
  useEffect(() => {
    const stored = localStorage.getItem("favorite");
    if (stored) dispatch(setFavoruteItems(JSON.parse(stored)));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }, [favorites]);

  if (!isClientReady && !showSplash) return null;
  if (showSplash) return <SplashScreen onFinish={() => setIsClientReady(true)} />;

  return <>{children}</>;
}