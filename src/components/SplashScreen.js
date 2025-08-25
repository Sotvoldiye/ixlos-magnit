"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import style from "./SplashScreen.module.css";
import Image from "next/image";

const rows = 12;
const cols = 12;

const SplashScreen = ({ onFinish }) => {
  const containerRef = useRef(null);
  const [showTiles, setShowTiles] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTiles(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showTiles || !containerRef.current) return;

    const tiles = containerRef.current.querySelectorAll(`.${style.tile}`);
    const tl = gsap.timeline({
      onComplete: () => {
        containerRef.current.style.display = "none";
        onFinish?.();
      },
    }, [onFinish]);

    tl.fromTo(
      tiles,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 0,
        stagger: {
          grid: [rows, cols],
          from: "end",
          amount: 1,
        },
        ease: "power2.inOut",
        duration: 1,
      }
    );

    return () => tl.kill();
  }, [showTiles]);

  const tiles = [];
  if (showTiles) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        tiles.push(
          <div
            key={`${row}-${col}`}
            className={style.tile}
            style={{
              backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
            }}
          />
        );
      }
    }
  }

  return (
    <div ref={containerRef} className={style.splash_container}>
      {!showTiles && (
        <div className={style.imageWrapper}>
          <Image
            src="/images/grocery.jpg"
            alt="Logo"
            fill
            className={style.full_logo}
            priority
          />
        </div>
      )}

      {showTiles && <div className={style.grid}>{tiles}</div>}

      {/* faqat kichik ekranlarda chiqadi */}
      <div className={style.ixlos}>
        <Image
          src="/images/ixlosmagnit.svg"
          alt="Ixlos Magnit Logo"
          width={120}
          height={40}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
