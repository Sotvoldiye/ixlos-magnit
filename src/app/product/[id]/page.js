// app/product/[id]/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import Image from "next/image";
import ProductGallery from "@/components/productGallery";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Breadcrumb from "@/components/Breadcrump";
import Login from "@/components/Login";
import { AnimatePresence } from "framer-motion";
import ProductPageSkeleton from "../../../components/PageSkeleton";

export default function ProductPage() {
  const { data, isLoading } = useGetAllProductsQuery();
  const [showLoginModal, setShowLoginModal] = useState(false)
  const params = useParams();
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const buyProduct = () => {
    if (!user) {
      setShowLoginModal(true)
      return;
    }

  };

  useEffect(() => {
    if (data && params?.id) {
      const found = data.products.find(
        (p) => String(p.id) === String(params.id)
      );
      setProduct(found);
    }
  }, [data, params?.id]);

  if (isLoading || !product) return <ProductPageSkeleton/>;
  console.log(product);
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
          <ProductGallery images={product.images} />

          {/* RIGHT: PRODUCT INFO */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-gray-700 text-lg">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">
              {product.price} so&#39;m
            </p>
            <div className="flex gap-5 items-center">
              <p>Qolgan maxsulot {product.stock}</p>
              <input
                type="number"
                className="bg-gray-300 p-1 rounded-xl px-2"
                placeholder="Qancha harid qilmoqchisiz"
              />
            </div>
            <div className="flex items-center gap-5">
              {" "}
              <Button onClick={buyProduct}>Sotib olish</Button>
              <Button variant="green">Savatga qo&#39;shish</Button>
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
