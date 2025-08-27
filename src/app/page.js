"use client";

import HeroCarousel from "@/components/heroCarusel";
import Category from "@/app/category/page";
import CategoriesList from "@/components/CategoriesListX";
import CategoryListY from "@/components/CategoryListY";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "@/lib/api/productApi";
import LeftTheSlieder from "@/components/LeftTheSlieder";

export default function Home() {
  const { data, isLoading, error } = useGetAllCategoriesQuery();
  const { data: productsData, isLoading: prodLoading } =
    useGetAllProductsQuery();
  const categories = data || [];
    if(error){
      <p>Xatolik server bilan bog&aposlanib bo&aposlmadi</p>
      return
    }
  return (
    <div className="min-h-screen  bg-gray-100">
      <div className="bg-white md:px-15  sm:px-2 md:block">
        {" "}

        <CategoriesList categories={categories} products={productsData || []} />
      </div>
      <main className="md:px-15 sm:px-2">
<div className="flex flex-col lg:flex-row py-3 gap-4">
  {/* Kategoriya listi */}
  <div className=" max-w-70 hidden sm:hidden lg:block">
    <CategoryListY categories={categories} />
  </div>

  {/* Karusel */}
  <div className="flex-1">
    <HeroCarousel />
  </div>

  {/* Button container */}
  <div className="max-w-60 hidden sm:hidden lg:block">
    <LeftTheSlieder />
  </div>
</div>


        <Category />
      </main>
    </div>
  );
}
