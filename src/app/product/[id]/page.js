"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import Image from "next/image";
import ProductGallery from "@/components/productGallery";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "@/components/Breadcrump";
import Login from "@/components/Login";
import { AnimatePresence } from "framer-motion";
import ProductPageSkeleton from "../../../components/PageSkeleton";
import { addBags, addFavorute, removeFavorute, removerBags } from "@/lib/slice/Slice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllProductsQuery();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState(null);
  const router = useRouter();

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

  const buyProduct = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Xarid qilish logikasi shu yerga yoziladi
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
    if (!product) return
    const isInFavorite = favorites.some((item) => item.id === product.id);
    if (isInFavorite) {
      dispatch(removeFavorute({ id: product.id }));
    } else {
      dispatch(addFavorute(product));
    }
  };
  return (
    <div className="px-6">
      {product && (
        <Breadcrumb
          category={product.category?.split(" / ") || []}
          title={product.title}
        />
      )}
      <div className="py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT: GALLERY */}
          <ProductGallery images={product.images} toggleFavorite={toggleFavorite} favorites={favorites} />

          {/* RIGHT: PRODUCT INFO */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-gray-700 text-lg">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">
              {product.price} so&#39;m
            </p>

            <div className="flex gap-5 items-center">
              <p>Qolgan mahsulot: {product.stock}</p>
              <input
                type="number"
                className="bg-gray-300 p-1 rounded-xl px-2"
                placeholder="Nechta olmoqchisiz"
              />
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
        {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
