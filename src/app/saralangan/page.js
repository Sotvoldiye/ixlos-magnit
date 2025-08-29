"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBags, removerBags, removeFavorite } from "@/lib/slice/Slice";
import useProductCard from "@/hooks/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useGetAllOrdersQuery } from "@/lib/api/productApi";

const SaralanganPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorute.items || []);
  const bags = useSelector((state) => state.bags.items || []);
  const user = useSelector((state) => state.user.user);
  const { data: ordersData, isLoading: isOrdersLoading } = useGetAllOrdersQuery();
  const { itemExistsIn, toggleFavorited } = useProductCard();
  const BASE_URL = "http://127.0.0.1:5000";

  // Helper function to check if an item has an active order
  const hasActiveOrder = (item) => {
    if (isOrdersLoading || !ordersData || !user) {
      return false;
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
      ?.filter((item) => item.user_id === user.id) || [];

    return orderedItems.some(
      (ord) => ord.product_id === item.id && !["cancelled", "completed"].includes(ord.status)
    );
  };

  const handleToggleBags = (item) => {
    const isActiveOrder = hasActiveOrder(item);

    if (isActiveOrder) {
      toast.error("Bu mahsulot uchun faol buyurtma mavjud!", {
        toastId: `active-order-${item.id}`,
      });
      return;
    }

    if (itemExistsIn(bags, item)) {
      dispatch(removerBags({ id: item.id }));
      toast.success("Mahsulot savatdan olib tashlandi", {
        toastId: `bag-remove-${item.id}`,
      });
    } else {
      dispatch(addBags(item));
      toast.success("Mahsulot savatga qo‘shildi", {
        toastId: `bag-add-${item.id}`,
      });
    }
  };

  const handleCardRemove = (item) => {
    const isActiveOrder = hasActiveOrder(item);

    if (isActiveOrder) {
      toast.error("Bu mahsulot uchun faol buyurtma mavjud, saralanganlardan o'chirib bo'lmaydi!", {
        toastId: `active-order-favorite-${item.id}`,
      });
      return;
    }

    dispatch(removeFavorite({ id: item.id }));
    toast.success("Mahsulot saralanganlardan olib tashlandi", {
      toastId: `favorite-remove-${item.id}`,
    });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Saralangan mahsulotlar</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Hozircha saralangan mahsulot yo‘q.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((item, index) => {
            const imageUrl =
              item?.images?.length > 0
                ? `${BASE_URL}${item.images[0].url}`
                : "/no-image.png";

            return (
              <div
                key={item?.id || index}
                className="flex flex-col relative w-full rounded-md border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full">
                  <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    <i
                      className={`fas fa-heart text-md cursor-pointer transition-colors  ${
                        itemExistsIn(favorites, item) ? "text-red-500" : ""
                      }`}
                      onClick={() => handleCardRemove(item)}
                    ></i>
                    <i
                      className={`fa-solid fa-cart-shopping text-md cursor-pointer transition-colors ${
                        itemExistsIn(bags, item) ? "text-green-600 " : ""
                      }`}
                      onClick={() => handleToggleBags(item)}
                    ></i>
                  </div>
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={imageUrl}
                      alt={item?.name || "Product Image"}
                      width={300}
                      height={300}
                      className="w-full h-[200px] object-cover rounded-t-md"
                      onError={(e) => (e.target.src = "/no-image.png")} // Fallback for broken images
                    />
                  </Link>
                </div>
                <div className="p-2">
                  <Link href={`/product/${item.id}`}>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item?.name || "N/A"}</p>
                    <p className="text-[15px] font-semibold text-green-700">
                      {item?.price ? `${item.price} so‘m` : "Price not available"}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SaralanganPage;