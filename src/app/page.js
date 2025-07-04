'use client';

import HeroCarousel from "@/components/heroCarusel";
import Category from "@/app/categorys/page";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";

export default function Home() {

  return (
    <div className="min-h-screen">
      <main>
        <HeroCarousel />
        <Category />
      </main>
    </div>
  );
}
