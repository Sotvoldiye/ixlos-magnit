"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import LayoutWrapper from "@/components/LayoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFavoruteItems } from "@/lib/slice/Slice";

export default function ClientWrapper({ children }) {
  const [isClientReady, setIsClientReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items);

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

  // Faqat bir marta localStorage'dan Reduxga favoritlarni yuklash
  useEffect(() => {
    const stored = localStorage.getItem("favorite");
    if (stored) {
      dispatch(setFavoruteItems(JSON.parse(stored)));
    }
  }, [dispatch]);

  // Redux o‘zgarishida localStorage'ga yozish
  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }, [favorites]);

  if (!isClientReady && !showSplash) return null;

  return showSplash ? (
    <SplashScreen />
  ) : (
    <LayoutWrapper>{children}</LayoutWrapper>
  );
}
