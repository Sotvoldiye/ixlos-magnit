"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import ProductGallery from "@/components/productGallery";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "@/components/Breadcrump";
import Login from "@/components/Login";
import { AnimatePresence } from "framer-motion";
import ProductPageSkeleton from "../../../components/PageSkeleton";
import {
  addBags,
  addFavorute,
  removeFavorute,
  removerBags,
} from "@/lib/slice/Slice";
import { toast } from "react-toastify";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllProductsQuery();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const [quantities, setQuantities] = useState({});
  const quantity = product ? quantities[product.id] || 1 : 1;
  
  const updateQuantity = (id, delta, stock) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = current + delta;
  
      if (updated < 1 || updated > stock) {
        if (!toast.isActive(`qty-limit-${id}`)) {
          toast.error(`Mahsulot miqdori 1 dan kam va ${stock} dan ortiq bo‘lishi mumkin emas`, {
            toastId: `qty-limit-${id}`,
          });
        }
        return prev;
      }
  
      return { ...prev, [id]: updated };
    });}

  const user = useSelector((state) => state.user.user);
  const bags = useSelector((state) => state.bags.items);
  const favorites = useSelector((state) => state.favorute.items);

  useEffect(() => {
    if (data && params?.id) {
      const found = data.products.find(
        (p) => String(p.id) === String(params.id)
      );
      setProduct(found);
    }
  }, [data, params?.id]);

  if (isLoading || !product) return <ProductPageSkeleton />;

  const isFavorited = favorites.some((fav) => fav.id === product.id);

  const buyProduct = () => {
    // if (!user) {
    //   setShowLoginModal(true);
    //   return;
    // }

    // Xarid qilish logikasi
  };

  const toggleBag = (e) => {
    e.preventDefault();
    if (!product) return;

    const isInBag = bags.some((item) => item.id === product.id);
    if (isInBag) {
      dispatch(removerBags({ id: product.id }));
    } else {
      dispatch(addBags(product));
    }
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (!product) return;
    if (isFavorited) {
      dispatch(removeFavorute({ id: product.id }));
    } else {
      dispatch(addFavorute(product));
    }
  };



  return (
    <div className="px-6">
      <Breadcrumb
        category={product.category?.split(" / ") || []}
        title={product.title}
      />

      <div className="py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT: GALLERY */}
          <ProductGallery
            images={product.images}
            toggleFavorite={toggleFavorite}
            isFavorited={isFavorited}
          />

          {/* RIGHT: PRODUCT INFO */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-gray-700 text-lg">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">
              {product.price} so&#39;m
            </p>

            <div className="flex gap-5 items-center">
  <p>Qolgan mahsulot: {product.stock}</p>

  <div className="flex items-center gap-2">
    <button
      onClick={() => updateQuantity(product.id, -1, product.stock)}
      className="border px-3 py-1 rounded hover:bg-gray-100"
    >
      −
    </button>
    <span className="min-w-[30px] text-center">{quantity}</span>
    <button
      onClick={() => updateQuantity(product.id, 1, product.stock)}
      className="border px-3 py-1 rounded hover:bg-gray-100"
    >
      +
    </button>
  </div>
</div>


            <div className="flex items-center gap-5">
              <Button onClick={buyProduct}>Sotib olish</Button>
              <Button
                onClick={toggleBag}
                variant={
                  bags.some((item) => item.id === product.id)
                    ? "destructive"
                    : "green"
                }
              >
                {bags.some((item) => item.id === product.id)
                  ? "Savatdan olib tashlash"
                  : "Savatga qo‘shish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLoginModal && (
          <Login onClose={() => setShowLoginModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
