'use client';

import HeroCarousel from "@/components/heroCarusel";
import Category from "@/app/category/page";
import CategoriesList from "@/components/CategoriesListX";
import CategoryListY from "@/components/CategoryListY";
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "@/lib/api/productApi";
import LeftTheSlieder from "@/components/LeftTheSlieder";

export default function Home() {
  const { data, isLoading, error } = useGetAllCategoriesQuery();
  const { data: productsData, isLoading: prodLoading } = useGetAllProductsQuery();
  const categories = data || [];

  return (
    <div className="min-h-screen  bg-gray-100">
<div className="bg-white px-15">              <CategoriesList categories={categories} products={productsData || []} />
</div>
      <main className="px-15  ">

        <div className="flex items-start gap-4 py-3 ">
          <CategoryListY categories={categories} />
          <HeroCarousel />

          {/* Button container */}
          <LeftTheSlieder/>
        </div>

        <Category />
      </main>
    </div>
  );
}
