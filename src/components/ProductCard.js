"use client";

import { useSelector } from "react-redux";
import useProductCard from "@/hooks/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useGetAllOrdersQuery } from "@/lib/api/productApi";

export default function Cards({ product }) {
  const {
    favorites,
    bags,
    itemExistsIn,
    toggleFavorite,
    toggleBags,
  } = useProductCard(product);
  const user = useSelector((state) => state.user.user);
  const userArr = user?.user;
  const { data: ordersData, isLoading: isOrdersLoading } = useGetAllOrdersQuery();

  // API bazaviy URL
  const BASE_URL = "http://127.0.0.1:5000";

  // Rasm URL ni yasash
  const imageUrl =
    product?.images?.length > 0
      ? BASE_URL + product.images[0].url
      : "/no-image.png";

  // Buyurtma holatini tekshirish
  const handleToggleBags = () => {
    if (isOrdersLoading || !ordersData || !userArr) {
      toggleBags(); // Agar ordersData hali yuklanmagan bo'lsa yoki foydalanuvchi login qilmagan bo'lsa, oddiy qo'shish yoki o'chirish
      toast.success(
        itemExistsIn(bags)
          ? "Mahsulot savatdan olib tashlandi"
          : "Mahsulot savatga qo‘shildi",
        {
          toastId: `bag-toggle-${product.id}`,
        }
      );
      return;
    }

    const orderedItems = ordersData
      ?.flatMap((order) =>
        order.items.map((item) => ({
          ...item,
          order_id: order.id,
          user_id: order.user_id,
          status: order.status,
        }))
      )
      ?.filter((item) => item.user_id === userArr.id) || [];

    const isActiveOrder = orderedItems.some(
      (ord) => ord.product_id === product.id && !["cancelled", "completed"].includes(ord.status)
    );

    // Agar mahsulot savatda bo'lsa va faol buyurtma bo'lsa, olib tashlashni taqiqlash
    if (itemExistsIn(bags) && isActiveOrder) {
      toast.error("Bu mahsulot uchun faol buyurtma mavjud, savatdan o'chirib bo'lmaydi!", {
        toastId: `active-order-remove-${product.id}`,
      });
      return;
    }

    // Savatga qo'shish yoki olib tashlash
    toggleBags();
    toast.success(
      itemExistsIn(bags)
        ? "Mahsulot savatdan olib tashlandi"
        : "Mahsulot savatga qo‘shildi",
      {
        toastId: `bag-toggle-${product.id}`,
      }
    );
  };

  return (
    <div className="flex p-0 flex-col relative w-full rounded-lg transition">
      <div className="relative w-full">
        <i
          className={`text-xl absolute right-2 z-10 cursor-pointer ${
            itemExistsIn(favorites)
              ? "fas fa-heart text-red-500 scale-110"
              : "far fa-heart text-gray-700 hover:text-red-400"
          }`}
          onClick={toggleFavorite}
        ></i>

        <Link href={`/product/${product.id}`}>
          <Image
            src={imageUrl}
            alt={product?.name || "Mahsulot"}
            width={300}
            height={300}
            className="w-full h-[200px] object-cover rounded-md"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <Link href={`/product/${product.id}`}>
          <p className="text-sm font-medium text-gray-800 line-clamp-1">
            {product?.name}
          </p>
          <p className="text-[15px] text-gray-900 font-semibold">
            {product?.price} so&apos;m
          </p>
        </Link>

        <i
          className={`fa-solid fa-cart-shopping text-[18px] text-gray-700 hover:bg-gray-200 py-[5px] px-[10px] rounded-full cursor-pointer transition ${
            itemExistsIn(bags) ? "bg-gray-300 scale-110" : ""
          }`}
          onClick={handleToggleBags}
        />
      </div>
    </div>
  );
}