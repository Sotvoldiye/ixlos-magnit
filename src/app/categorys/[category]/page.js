"use client";

import Cards from "@/components/Cards";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import { useParams } from "next/navigation";
import React from "react";

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category; // or const { category } = params;

  const { data, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p className="text-center py-10">Yuklanmoqda...</p>;
  if (error) return <p className="text-red-600 text-center py-10">Xatolik: {error.message}</p>;
  if (!data?.products || !category) return <p>Kategoriya topilmadi.</p>;

  const filtered = data.products.filter((p) => p.category === category);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center capitalize">
        Kategoriya: {category}
      </h2>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Bu kategoriya bo‘yicha mahsulotlar topilmadi.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
