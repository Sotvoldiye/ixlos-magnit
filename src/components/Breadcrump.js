"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "@/lib/api/productApi";

export default function BagsPage() {
  const router = useRouter();
  const bags = useSelector((state) => state.bags.items || []);
  const user = useSelector((state) => state.user.user);
  const [createOrder] = useCreateOrderMutation();
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (id, delta, stock) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = current + delta;
      if (updated < 1 || updated > stock) {
        toast.error(`Mahsulot miqdori 1 dan kam va ${stock} dan ortiq bo‘lishi mumkin emas`);
        return prev;
      }
      return { ...prev, [id]: updated };
    });
  };

  const handleBuyAll = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    const items = bags.map((item) => ({
      product_id: item.id,
      quantity: quantities[item.id] || 1,
      price: item.price,
    }));

    try {
      const total_amount = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      const orderData = {
        user_id: user.id,
        total_amount,
        items,
      };
      const res = await createOrder(orderData).unwrap();
      toast.success(`Buyurtma qabul qilindi. ID: ${res.id}`);
    } catch (err) {
      toast.error("Buyurtma berishda xatolik yuz berdi");
    }
  };

  if (bags.length === 0) return <p>Saqlangan mahsulotlar yo‘q</p>;

  return (
    <div className="px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bags.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <p>{item.name}</p>
            <p>{item.price} so‘m</p>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => updateQuantity(item.id, -1, item.stock)}>-</button>
              <span>{quantities[item.id] || 1}</span>
              <button onClick={() => updateQuantity(item.id, 1, item.stock)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {bags.length > 0 && (
        <button
          onClick={handleBuyAll}
          className="bg-green-600 text-white px-6 py-2 mt-4 rounded"
        >
          Hammasini sotib olish
        </button>
      )}
    </div>
  );
}
