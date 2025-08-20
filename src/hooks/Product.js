"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function BuyButton({ product, quantity, onBuy, setShowLoginModal }) {
  const user = useSelector((state) => state.user.user);

  const handleBuy = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    onBuy?.();
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Xarid qilish
    </button>
  );
}