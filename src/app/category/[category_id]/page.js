"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
} from "@/lib/api/productApi";
import Cards from "@/components/Cards";

export default function CategoryPage() {
  const { category_id } = useParams();
  const categoryIdNum = parseInt(category_id);

  // API chaqirish
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetAllProductsQuery();

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  if (productsLoading || categoriesLoading)
    return <p className="text-center py-10">Yuklanmoqda...</p>;
  if (productsError)
    return (
      <p className="text-red-600 text-center py-10">
        Xatolik: {productsError.message}
      </p>
    );
  if (categoriesError)
    return (
      <p className="text-red-600 text-center py-10">
        Xatolik: {categoriesError.message}
      </p>
    );

  if (!categoriesData?.length || !productsData?.length)
    return <p>Kategoriya yoki mahsulotlar mavjud emas.</p>;

  // Tanlangan kategoriya
  const selectedCategory = categoriesData.find(
    (cat) => cat.id === categoryIdNum
  );
  if (!selectedCategory) return <p>Kategoriya topilmadi.</p>;

  // Filterlangan mahsulotlar
  const filteredProducts = productsData.filter(
    (product) => product.category_id === selectedCategory.id
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center capitalize">
        {selectedCategory.name}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          Bu kategoriya bo‘yicha mahsulotlar topilmadi.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredProducts.map((product) => (
            <Cards key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
