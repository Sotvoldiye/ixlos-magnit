'use client';

import { useState } from "react";
import { useCreateOrderMutation } from "@/lib/api/productApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductOrder({ item, user, quantities, setOrderedItems }) {
  const [createOrder] = useCreateOrderMutation();
  const router = useRouter();

  const handleBuySingle = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const orderData = {
      user_id: user.id,
      total_amount: item.price * (quantities[item.id] || 1),
      items: [
        {
          product_id: item.id,
          quantity: quantities[item.id] || 1,
          price: item.price,
        },
      ],
    };

    try {
      const res = await createOrder(orderData).unwrap();
      toast.success(`Buyurtma qabul qilindi: ${res.id}`);
      setOrderedItems((prev) => [...prev, res]);
    } catch (err) {
      toast.error("Buyurtma berishda xatolik yuz berdi");
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleBuySingle}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      Sotib olish
    </button>
  );
}
