"use client";

import { useSearchParams } from "next/navigation";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import Cards from "@/components/Cards";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const { data: productsData, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p className="p-6">Yuklanmoqda...</p>;
  if (error) return <p className="p-6 text-red-500">Xatolik: {error.message}</p>;

  let filteredProducts = productsData || [];

  // 🔍 Qidiruv bo‘yicha filter
  if (query) {
    filteredProducts = filteredProducts.filter((p) =>
      (p.name || "").toLowerCase().includes(query.toLowerCase())
    );
  }

  // 📂 Kategoriya bo‘yicha filter
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        (p.category?.name || "").toLowerCase() === category.toLowerCase()
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Qidiruv natijalari {query && `: "${query}"`}
      </h1>

      {filteredProducts.length === 0 ? (
        <p>Hech qanday mahsulot topilmadi.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Cards key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
