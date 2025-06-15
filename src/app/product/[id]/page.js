// app/product/[id]/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import Image from "next/image";

export default function ProductPage() {
  const { data, isLoading } = useGetAllProductsQuery();
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (data && params?.id) {
      const found = data.products.find(
        (p) => String(p.id) === String(params.id)
      );
      setProduct(found);
    }
  }, [data, params?.id]);

  if (isLoading || !product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <Image
        src={product.thumbnail}
        alt={product.title}
        className="w-full rounded-md"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-semibold">{product.price} so&#39;m</p>
    </div>
  );
}
