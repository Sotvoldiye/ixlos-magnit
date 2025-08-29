"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteItems } from "@/lib/slice/Slice";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";

export default function ClientWrapper({ children }) {
  const [isClientReady, setIsClientReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute?.items || []);
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
    }, 3000); // 3 soniya

    return () => clearTimeout(timer);
  }, []);

  // LocalStorage sync
  useEffect(() => {
    const stored = localStorage.getItem("favorite");
    if (stored) dispatch(setFavoriteItems(JSON.parse(stored)));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }, [favorites]);

  if (!isClientReady && !showSplash) return null;
  if (showSplash) return <SplashScreen onFinish={() => setIsClientReady(true)} />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}